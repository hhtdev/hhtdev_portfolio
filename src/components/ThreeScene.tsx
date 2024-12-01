import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ThreeSceneProps {
  setDisplayAboutMePage: (display: boolean) => void;
  setDisplayAboutThisProjectPage: (display: boolean) => void;
  setDisplayPlanetNavigationComponent: (display: boolean) => void;
  cameraFocus: string;
}

export const ThreeScene = React.memo((props: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Refs for state management
  const isFollowingEarth = useRef(false);
  const isFollowingSun = useRef(false);
  const userControlActive = useRef(false);

  // Scene, Camera, Renderer
  const scene = React.useMemo(() => new THREE.Scene(), []);
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000), []);
  camera.position.set(40, 0, 0);
  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true }), []);
  const controls = React.useMemo(() => new OrbitControls(camera, renderer.domElement), [camera, renderer.domElement]);

  // Mesh and Lights
  const planetGeometry = React.useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
  const planetAtmosphereGeometry = React.useMemo(() => new THREE.SphereGeometry(1.01, 64, 64), []);
  const starBackgroundGeometry = React.useMemo(() => new THREE.SphereGeometry(500, 90, 90), []);



  const textures = React.useMemo(() => ({
    earth: new THREE.TextureLoader().load("earth.jpg"),
    earthClouds: new THREE.TextureLoader().load("earth-clouds.png"),
    sun: new THREE.TextureLoader().load("sun.jpg"),
    stars: new THREE.TextureLoader().load("8k-stars-milky-way.jpg"),
  }), []);

  const materials = React.useMemo(() => ({
    earth: new THREE.MeshStandardMaterial({ map: textures.earth, depthTest: true }),
    clouds: new THREE.MeshStandardMaterial({ map: textures.earthClouds, transparent: true, depthTest: false }),
    atmosphere: new THREE.MeshStandardMaterial({ color: 0x00b3ff, emissive: 0x00b3ff, transparent: true, opacity: 0.1 }),
    sun: new THREE.MeshBasicMaterial({ map: textures.sun }),
    stars: new THREE.MeshBasicMaterial({ map: textures.stars, side: THREE.BackSide }),
  }), [textures]);

  const earthMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.earth), [planetGeometry, materials.earth]);
  const earthCloudsMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.clouds), [planetGeometry, materials.clouds]);
  const earthAtmosphereMesh = React.useMemo(() => new THREE.Mesh(planetAtmosphereGeometry, materials.atmosphere), [planetAtmosphereGeometry, materials.atmosphere]);
  const sunMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.sun), [planetGeometry, materials.sun]);
  const starBackgroundMesh = React.useMemo(() => new THREE.Mesh(starBackgroundGeometry, materials.stars), [starBackgroundGeometry, materials.stars]);

  const sunLight = React.useMemo(() => new THREE.PointLight(0xffffff, 1500, 0), []);
  const earthDistance = 50;

  const handleResize = React.useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }, [camera, renderer]);

  const handleClick = React.useCallback((event: MouseEvent) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      //TODO: Add tweening someday (maybe)
      switch (intersects[0].object.name) {
        case 'earthAtmosphere':
          console.log('Earth clicked');
          isFollowingEarth.current = true;
          isFollowingSun.current = false;
          props.setDisplayAboutMePage(true);
          break;
        case 'sun':
          console.log('Sun clicked');
          isFollowingSun.current = true;
          isFollowingEarth.current = false;
          props.setDisplayAboutThisProjectPage(true);
          break;
        default:
          break;
      }
    }
  }, [camera, scene.children, props]);

  // Camera focus logic
  useEffect(() => {
    if (props.cameraFocus === 'earth') {
      isFollowingEarth.current = true;
      isFollowingSun.current = false;
      props.setDisplayAboutMePage(true);
    } else if (props.cameraFocus === 'sun') {
      isFollowingEarth.current = false;
      isFollowingSun.current = true;
      props.setDisplayAboutThisProjectPage(true);
    } else {
      isFollowingEarth.current = false;
      isFollowingSun.current = false;
      props.setDisplayAboutMePage(false);
      props.setDisplayAboutThisProjectPage(false);
    }
  }, [props.cameraFocus, props]);

  // Main animation loop
  const animate = React.useCallback(() => {
    animationFrameId.current = requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.001;
    earthCloudsMesh.rotation.y += 0.0017;
    sunMesh.rotation.y += 0.0005;

    // Earth and atmosphere rotation
    const earthDistance = 50;
    const updatePosition = (mesh: THREE.Mesh, distance: number) => {
      mesh.position.x = distance * Math.cos(earthMesh.rotation.y);
      mesh.position.z = distance * Math.sin(earthMesh.rotation.y);
    };
    updatePosition(earthMesh, earthDistance);
    updatePosition(earthCloudsMesh, earthDistance);
    updatePosition(earthAtmosphereMesh, earthDistance);

    // Camera following logic
    const updateCameraFollow = (targetMesh: THREE.Mesh, distance: number) => {
      const offset = camera.position.clone().sub(controls.target).normalize().multiplyScalar(distance);
      controls.target.copy(targetMesh.position);
      camera.position.copy(targetMesh.position.clone().add(offset));
    };

    if (isFollowingSun.current) {
      updateCameraFollow(sunMesh, 40);
    } else if (isFollowingEarth.current) {
      updateCameraFollow(earthMesh, 3);
    }

    controls.update();
    renderer.render(scene, camera);
  }, [camera, controls, earthMesh, earthCloudsMesh, earthAtmosphereMesh, sunMesh, renderer, scene]);

  // Scene initialization
  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current?.appendChild(renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    sunMesh.scale.set(10, 10, 10);

    earthMesh.renderOrder = 0;
    earthCloudsMesh.renderOrder = 1;

    //TODO: Check this, it feels wrong
    earthMesh.rotation.x = 0.23;
    earthCloudsMesh.rotation.x = 0.23;

    earthMesh.position.x = earthDistance;
    earthCloudsMesh.position.x = earthDistance;
    earthAtmosphereMesh.position.x = earthDistance;

    starBackgroundMesh.rotation.x = 60.2;

    earthMesh.castShadow = true;
    earthCloudsMesh.castShadow = true;
    earthMesh.receiveShadow = true;
    earthCloudsMesh.receiveShadow = true;
    sunLight.castShadow = true;

    sunMesh.add(sunLight);

    earthMesh.name = 'earth';
    earthCloudsMesh.name = 'earthClouds';
    earthAtmosphereMesh.name = 'earthAtmosphere';
    sunMesh.name = 'sun';

    scene.add(sunLight);
    scene.add(earthMesh);
    scene.add(earthCloudsMesh);
    scene.add(earthAtmosphereMesh);
    scene.add(sunMesh);
    scene.add(starBackgroundMesh);

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    controls.addEventListener('start', () => {
      userControlActive.current = true;
    });

    controls.addEventListener('end', () => {
      userControlActive.current = false;
      // Save the relative position from the target when user stops dragging
      if (isFollowingEarth.current) {
        const relativePosition = camera.position.clone().sub(earthMesh.position);
        camera.position.copy(earthMesh.position.clone().add(relativePosition));
      } else if (isFollowingSun.current) {
        const relativePosition = camera.position.clone().sub(sunMesh.position);
        camera.position.copy(sunMesh.position.clone().add(relativePosition));
      }
    });
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [renderer, scene, sunMesh, sunLight, earthMesh, earthCloudsMesh, earthAtmosphereMesh, starBackgroundMesh, handleResize, animate, controls, camera.position, handleClick]);

  return <div ref={containerRef} />;
});
