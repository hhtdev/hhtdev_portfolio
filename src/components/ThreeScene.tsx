import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ThreeSceneProps {
  setDisplayAdemiPage: (display: boolean) => void;
  setDisplayMichelinPage: (display: boolean) => void;
  setDisplayAboutMePage: (display: boolean) => void;
  setDisplayAboutThisProjectPage: (display: boolean) => void;
  setDisplayPlanetNavigationComponent: (display: boolean) => void;
  setDisplayFranceTravailPage: (display: boolean) => void;
  cameraFocus: string;
}

export const ThreeScene = React.memo((props: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Refs for state management
  const isFollowingMercury = useRef(false);
  const isFollowingVenus = useRef(false);
  const isFollowingEarth = useRef(false);
  const isFollowingSun = useRef(false);
  const isFollowingMars = useRef(false);
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
    mercury: new THREE.TextureLoader().load("mercury.jpg"),
    venus: new THREE.TextureLoader().load("venus.jpg"),
    earth: new THREE.TextureLoader().load("earth.jpg"),
    earthClouds: new THREE.TextureLoader().load("earth-clouds.png"),
    sun: new THREE.TextureLoader().load("sun.jpg"),
    mars: new THREE.TextureLoader().load("mars.jpg"),
    stars: new THREE.TextureLoader().load("8k-stars-milky-way.jpg"),
  }), []);

  const materials = React.useMemo(() => ({
    mercury: new THREE.MeshStandardMaterial({ map: textures.mercury }),
    venus: new THREE.MeshStandardMaterial({ map: textures.venus }),
    earth: new THREE.MeshStandardMaterial({ map: textures.earth, depthTest: true }),
    clouds: new THREE.MeshStandardMaterial({ map: textures.earthClouds, transparent: true, depthTest: false }),
    atmosphere: new THREE.MeshStandardMaterial({ color: 0x00b3ff, emissive: 0x00b3ff, transparent: true, opacity: 0.1 }),
    sun: new THREE.MeshBasicMaterial({ map: textures.sun }),
    mars: new THREE.MeshStandardMaterial({ map: textures.mars }),
    stars: new THREE.MeshBasicMaterial({ map: textures.stars, side: THREE.BackSide }),
  }), [textures]);

  const mercuryMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.mercury), [planetGeometry, materials.mercury]);
  const venusMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.venus), [planetGeometry, materials.venus]);
  const earthMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.earth), [planetGeometry, materials.earth]);
  const earthCloudsMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.clouds), [planetGeometry, materials.clouds]);
  const earthAtmosphereMesh = React.useMemo(() => new THREE.Mesh(planetAtmosphereGeometry, materials.atmosphere), [planetAtmosphereGeometry, materials.atmosphere]);
  const sunMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.sun), [planetGeometry, materials.sun]);
  const marsMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materials.mars), [planetGeometry, materials.mars]);
  const starBackgroundMesh = React.useMemo(() => new THREE.Mesh(starBackgroundGeometry, materials.stars), [starBackgroundGeometry, materials.stars]);

  const sunLight = React.useMemo(() => new THREE.PointLight(0xffffff, 20000, 0), []);

  //Distance from the sun divided by 1 000 000
  const mercuryDistance = 58;
  const venusDistance = 108;
  const earthDistance = 150;
  const marsDistance = 228;

  const mercuryOrbit = useRef(0);
  const venusOrbit = useRef(0);
  const earthOrbit = useRef(0);
  const marsOrbit = useRef(0);

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
        case 'mercury':
          console.log('Mercury clicked');
          isFollowingMercury.current = true;
          isFollowingVenus.current = false;
          isFollowingEarth.current = false;
          isFollowingSun.current = false;
          props.setDisplayAdemiPage(true);
          props.setDisplayPlanetNavigationComponent(false);
          break;
        case 'venus':
          console.log('Venus clicked');
          isFollowingVenus.current = true;
          isFollowingMercury.current = false;
          isFollowingEarth.current = false;
          isFollowingSun.current = false;
          props.setDisplayMichelinPage(true);
          props.setDisplayPlanetNavigationComponent(false);
          break;
        case 'earthAtmosphere':
          console.log('Earth clicked');
          isFollowingEarth.current = true;
          isFollowingSun.current = false;
          isFollowingMercury.current = false;
          isFollowingVenus.current = false;
          props.setDisplayAboutMePage(true);
          props.setDisplayPlanetNavigationComponent(false);
          break;
        case 'sun':
          console.log('Sun clicked');
          isFollowingSun.current = true;
          isFollowingEarth.current = false;
          isFollowingMercury.current = false;
          isFollowingVenus.current = false;
          props.setDisplayAboutThisProjectPage(true);
          props.setDisplayPlanetNavigationComponent(false);
          break;
        case 'mars':
          console.log('Mars clicked');
          isFollowingMars.current = true;
          isFollowingSun.current = false;
          isFollowingEarth.current = false;
          props.setDisplayFranceTravailPage(true);
          props.setDisplayPlanetNavigationComponent(false);
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
      isFollowingMercury.current = false;
      isFollowingVenus.current = false;
      isFollowingMars.current = false;
      props.setDisplayAboutMePage(true);
      props.setDisplayAboutThisProjectPage(false);
      props.setDisplayPlanetNavigationComponent(false);
      props.setDisplayFranceTravailPage(false);
      props.setDisplayAdemiPage(false);
      props.setDisplayMichelinPage(false);
    } else if (props.cameraFocus === 'sun') {
      isFollowingEarth.current = false;
      isFollowingSun.current = true;
      isFollowingMars.current = false;
      isFollowingMercury.current = false;
      isFollowingVenus.current = false;
      props.setDisplayAboutThisProjectPage(true);
      props.setDisplayAboutMePage(false);
      props.setDisplayPlanetNavigationComponent(false);
      props.setDisplayFranceTravailPage(false);
      props.setDisplayAdemiPage(false);
      props.setDisplayMichelinPage(false);
    } else if (props.cameraFocus === 'mars') {
      isFollowingMars.current = true;
      isFollowingSun.current = false;
      isFollowingEarth.current = false;
      isFollowingMercury.current = false;
      isFollowingVenus.current = false;
      props.setDisplayFranceTravailPage(true);
      props.setDisplayAboutThisProjectPage(false);
      props.setDisplayAboutMePage(false);
      props.setDisplayPlanetNavigationComponent(false);
      props.setDisplayAdemiPage(false);
      props.setDisplayMichelinPage(false);
    } else if (props.cameraFocus === 'mercury') {
      isFollowingMercury.current = true;
      isFollowingVenus.current = false;
      isFollowingEarth.current = false;
      isFollowingSun.current = false;
      isFollowingMars.current = false;
      props.setDisplayAdemiPage(true);
      props.setDisplayPlanetNavigationComponent(false);
      props.setDisplayMichelinPage(false);
      props.setDisplayFranceTravailPage(false);
      props.setDisplayAboutMePage(false);
      props.setDisplayAboutThisProjectPage(false);
    } else if (props.cameraFocus === 'venus') {
      isFollowingVenus.current = true;
      isFollowingMercury.current = false;
      isFollowingEarth.current = false;
      isFollowingSun.current = false;
      isFollowingMars.current = false;
      props.setDisplayMichelinPage(true);
      props.setDisplayPlanetNavigationComponent(false);
      props.setDisplayAdemiPage(false);
      props.setDisplayFranceTravailPage(false);
      props.setDisplayAboutMePage(false);
      props.setDisplayAboutThisProjectPage(false);
    } else {
      isFollowingEarth.current = false;
      isFollowingSun.current = false;
      isFollowingMercury.current = false;
      isFollowingVenus.current = false;
      isFollowingMars.current = false;
      props.setDisplayAboutMePage(false);
      props.setDisplayAboutThisProjectPage(false);
      props.setDisplayFranceTravailPage(false);
      props.setDisplayAdemiPage(false);
      props.setDisplayMichelinPage(false);
      props.setDisplayPlanetNavigationComponent(true);
    }
  }, [props.cameraFocus, props]);

  // Main animation loop
  const animate = React.useCallback(() => {
    animationFrameId.current = requestAnimationFrame(animate);

    // Planet rotation on its axis (Venus is a special case)
    mercuryMesh.rotation.y += 0.00100;
    venusMesh.rotation.y -= 0.00100;
    earthMesh.rotation.y += 0.00100;
    earthCloudsMesh.rotation.y += 0.00200;
    sunMesh.rotation.y += 0.00100;
    marsMesh.rotation.y += 0.00100;

    //TODO: Create a single function for this
    const updateEarthPosition = (mesh: THREE.Mesh, distance: number) => {
      //Actual orbit speed around the sun
      earthOrbit.current -= 0.000298;
      mesh.position.x = distance * Math.cos(earthOrbit.current);
      mesh.position.z = distance * Math.sin(earthOrbit.current);
    };

    const updateEarthCloudsAndAtmospherePosition = (mesh: THREE.Mesh, distance: number) => {
      mesh.position.x = distance * Math.cos(earthOrbit.current);
      mesh.position.z = distance * Math.sin(earthOrbit.current);
    };

    const updateMarsPosition = (mesh: THREE.Mesh, distance: number) => {
      //Actual orbit speed around the sun
      marsOrbit.current -= 0.000240;
      mesh.position.x = distance * Math.cos(marsOrbit.current);
      mesh.position.z = distance * Math.sin(marsOrbit.current);
    };

    const updateMercuryPosition = (mesh: THREE.Mesh, distance: number) => {
      //Actual orbit speed around the sun
      mercuryOrbit.current -= 0.000479;
      mesh.position.x = distance * Math.cos(mercuryOrbit.current);
      mesh.position.z = distance * Math.sin(mercuryOrbit.current);
    };

    //Venus is a special case because of its rotation
    const updateVenusPosition = (mesh: THREE.Mesh, distance: number) => {
      //Actual orbit speed around the sun
      venusOrbit.current -= 0.000350;
      mesh.position.x = distance * Math.cos(venusOrbit.current);
      mesh.position.z = distance * Math.sin(venusOrbit.current);
    };

    updateMercuryPosition(mercuryMesh, mercuryDistance);
    updateVenusPosition(venusMesh, venusDistance);
    updateEarthPosition(earthMesh, earthDistance);
    updateEarthCloudsAndAtmospherePosition(earthCloudsMesh, earthDistance);
    updateEarthCloudsAndAtmospherePosition(earthAtmosphereMesh, earthDistance);
    updateMarsPosition(marsMesh, marsDistance);

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
    } else if (isFollowingMars.current) {
      updateCameraFollow(marsMesh, 2);
    } else if (isFollowingMercury.current) {
      updateCameraFollow(mercuryMesh, 2);
    } else if (isFollowingVenus.current) {
      updateCameraFollow(venusMesh, 3);
    }

    controls.update();
    renderer.render(scene, camera);
  }, [camera, controls, mercuryMesh, venusMesh, marsMesh, earthMesh, earthCloudsMesh, earthAtmosphereMesh, sunMesh, renderer, scene]);

  // Scene initialization
  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current?.appendChild(renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    sunMesh.scale.set(10, 10, 10);
    mercuryMesh.scale.set(0.38, 0.38, 0.38);
    venusMesh.scale.set(0.95, 0.95, 0.95);
    marsMesh.scale.set(0.53, 0.53, 0.53);

    earthMesh.renderOrder = 0;
    earthCloudsMesh.renderOrder = 1;

    //TODO: Check this, it feels wrong
    earthMesh.rotation.x = -0.23;
    earthCloudsMesh.rotation.x = -0.23;

    marsMesh.rotation.x = -0.252;

    mercuryMesh.rotation.x = -0.03;
    venusMesh.rotation.x = -0;

    earthMesh.position.x = earthDistance;
    earthCloudsMesh.position.x = earthDistance;
    earthAtmosphereMesh.position.x = earthDistance;

    marsMesh.position.x = marsDistance;

    mercuryMesh.position.x = mercuryDistance;

    venusMesh.position.x = venusDistance;

    starBackgroundMesh.rotation.x = 60.2;

    mercuryMesh.castShadow = true;
    mercuryMesh.receiveShadow = true;

    venusMesh.castShadow = true;
    venusMesh.receiveShadow = true;

    earthMesh.castShadow = true;
    earthCloudsMesh.castShadow = true;
    earthMesh.receiveShadow = true;
    earthCloudsMesh.receiveShadow = true;

    marsMesh.castShadow = true;
    marsMesh.receiveShadow = true;

    sunLight.castShadow = true;

    sunMesh.add(sunLight);

    earthMesh.name = 'earth';
    earthCloudsMesh.name = 'earthClouds';
    earthAtmosphereMesh.name = 'earthAtmosphere';
    marsMesh.name = 'mars';
    sunMesh.name = 'sun';
    mercuryMesh.name = 'mercury';
    venusMesh.name = 'venus';

    scene.add(sunLight);
    scene.add(mercuryMesh);
    scene.add(venusMesh);
    scene.add(marsMesh);
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
      } else if (isFollowingMars.current) {
        const relativePosition = camera.position.clone().sub(marsMesh.position);
        camera.position.copy(marsMesh.position.clone().add(relativePosition));
      } else if (isFollowingMercury.current) {
        const relativePosition = camera.position.clone().sub(mercuryMesh.position);
        camera.position.copy(mercuryMesh.position.clone().add(relativePosition));
      } else if (isFollowingVenus.current) {
        const relativePosition = camera.position.clone().sub(venusMesh.position);
        camera.position.copy(venusMesh.position.clone().add(relativePosition));
      }
    });
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [renderer, scene, sunMesh, sunLight, mercuryMesh, venusMesh, marsMesh, earthMesh, earthCloudsMesh, earthAtmosphereMesh, starBackgroundMesh, handleResize, animate, controls, camera.position, handleClick]);

  return <div ref={containerRef} />;
});
