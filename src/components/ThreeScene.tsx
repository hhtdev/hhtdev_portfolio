import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ThreeSceneProps {
  setDisplayAboutMePage: (display: boolean) => void;
  setDisplayAboutThisProjectPage: (display: boolean) => void;
}

export const ThreeScene = React.memo((props: ThreeSceneProps) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const scene = React.useMemo(() => new THREE.Scene(), []);
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000), []);
  camera.position.set(40, 0, 0);
  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true }), []);

  const earthDistance = 50;

  const planetGeometry = React.useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
  const planetAtmosphereGeometry = React.useMemo(() => new THREE.SphereGeometry(1.01, 64, 64), []);
  const starBackgroundGeometry = React.useMemo(() => new THREE.SphereGeometry(500, 90, 90), []);

  const earthTexture = new THREE.TextureLoader().load("earth.jpg");
  const earthCloudsTexture = new THREE.TextureLoader().load("earth-clouds.png");
  const sunTexture = new THREE.TextureLoader().load("sun.jpg");
  const starsTexture = new THREE.TextureLoader().load("8k-stars-milky-way.jpg");
  const materialEarth = React.useMemo(() => new THREE.MeshStandardMaterial({ map: earthTexture, depthTest: true }), [earthTexture]);
  const materialClouds = React.useMemo(() => new THREE.MeshStandardMaterial({ map: earthCloudsTexture, transparent: true, depthTest: false }), [earthCloudsTexture]);
  const materialAtmosphere = React.useMemo(() => new THREE.MeshStandardMaterial({ color: 0x00b3ff, emissive: 0x00b3ff, transparent: true, opacity: 0.1 }), []);
  const materialSun = React.useMemo(() => new THREE.MeshBasicMaterial({ map: sunTexture }), [sunTexture]);
  const materialStars = React.useMemo(() => new THREE.MeshBasicMaterial({ map: starsTexture, side: THREE.BackSide }), [starsTexture]);

  const earthMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materialEarth), [planetGeometry, materialEarth]);
  const earthCloudsMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materialClouds), [planetGeometry, materialClouds]);
  const earthAtmosphereMesh = React.useMemo(() => new THREE.Mesh(planetAtmosphereGeometry, materialAtmosphere), [planetAtmosphereGeometry, materialAtmosphere]);
  const sunMesh = React.useMemo(() => new THREE.Mesh(planetGeometry, materialSun), [planetGeometry, materialSun]);
  const starBackgroundMesh = React.useMemo(() => new THREE.Mesh(starBackgroundGeometry, materialStars), [starBackgroundGeometry, materialStars]);

  const controls = React.useMemo(() => new OrbitControls(camera, renderer.domElement), [camera, renderer.domElement]);
  const mouse = React.useMemo(() => new THREE.Vector2(), []);
  const raycaster = React.useMemo(() => new THREE.Raycaster(), []);

  const sunLight = React.useMemo(() => new THREE.PointLight(0xffffff, 1500, 0), []);

  const isFollowingEarth = React.useRef(false);
  const isFollowingSun = React.useRef(false);
  const userControlActive = React.useRef(false);

  const sunCameraDistance = 40;
  const earthCameraDistance = 3;


  const handleResize = React.useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }, [camera, renderer]);

  const updateMeshHoverEmissiveColor = React.useCallback((meshName: string, emissive: boolean, color: number) => {
    containerRef.current?.style.setProperty('cursor', emissive ? 'pointer' : 'default');
    switch (meshName) {
      case 'earthAtmosphere':
        earthAtmosphereMesh.material.color.setHex(color);
        earthAtmosphereMesh.material.emissive.setHex(color);
        earthAtmosphereMesh.material.emissive = emissive ? new THREE.Color(0x00b3ff) : new THREE.Color(0x000000);
        break;
      case 'sun':
        break;
      default:
        break;
    }
  }, [earthAtmosphereMesh.material]);

  // In the animate function, replace the Sun following code:

  const animate = React.useCallback(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.001;
    earthCloudsMesh.rotation.y += 0.0017;
    sunMesh.rotation.y += 0.0005;

    // Update Earth position
    earthMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);
    earthCloudsMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthCloudsMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);
    earthAtmosphereMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthAtmosphereMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);

    //TODO: Add tweening someday
    // Always update camera position if following, even during user control
    if (isFollowingSun.current) {
      // Keep the same relative position while following Sun
      const offset = camera.position.clone().sub(controls.target).normalize().multiplyScalar(sunCameraDistance);
      controls.target.copy(sunMesh.position);
      camera.position.copy(sunMesh.position.clone().add(offset));
    } else if (isFollowingEarth.current) {
      // Keep the same relative position while following Earth
      const offset = camera.position.clone().sub(controls.target).normalize().multiplyScalar(earthCameraDistance);
      controls.target.copy(earthMesh.position);
      camera.position.copy(earthMesh.position.clone().add(offset));
    } else {
      //When the focus is not on anything in particular, the camera is free (remove all content from pages)
      props.setDisplayAboutMePage(false);
      props.setDisplayAboutThisProjectPage(false);
    }

    controls.update();
    renderer.render(scene, camera);
  }, [camera, controls, earthAtmosphereMesh.position, earthCloudsMesh.position, earthCloudsMesh.rotation, earthMesh.position, earthMesh.rotation, renderer, scene, sunMesh.position]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      containerRef.current?.appendChild(renderer.domElement);

      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;

      sunMesh.scale.set(10, 10, 10);

      earthMesh.renderOrder = 0;
      earthCloudsMesh.renderOrder = 1;

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
      animate();

      let previousObject = '';
      const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const sceneChildrensWithoutStars = scene.children.filter(child => child !== starBackgroundMesh);
        const intersects = raycaster.intersectObjects(sceneChildrensWithoutStars);

        if (intersects.length <= 0) {
          updateMeshHoverEmissiveColor(previousObject, false, previousObject === 'earthAtmosphere' ? 0x00b3ff : 0xffffff);
          previousObject = '';
        } else if (intersects[0].object.name !== previousObject) {
          updateMeshHoverEmissiveColor(previousObject, false, previousObject === 'earthAtmosphere' ? 0x00b3ff : 0xffffff);
          updateMeshHoverEmissiveColor(intersects[0].object.name, true, 0xffffff);
          previousObject = intersects[0].object.name;
        } else {
          updateMeshHoverEmissiveColor(intersects[0].object.name, true, 0xffffff);
          previousObject = intersects[0].object.name;
        }
      };

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


      const handleClick = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
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
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      window.addEventListener('resize', handleResize);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current); //Cleanup the animation frame to prevent doubke rendering
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [renderer, scene, camera, controls, earthMesh, earthCloudsMesh, earthAtmosphereMesh, starBackgroundMesh, mouse, raycaster, handleResize, animate, updateMeshHoverEmissiveColor, sunMesh, sunLight, props]);

  return (
    <div ref={containerRef} />
  );
});