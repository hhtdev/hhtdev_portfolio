import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene = React.useMemo(() => new THREE.Scene(), []);
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000), []);
  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true }), []);

  const earthDistance = 50;

  const planetGeometry = React.useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
  const planetAtmosphereGeometry = React.useMemo(() => new THREE.SphereGeometry(1.01, 64, 64), []);
  const starBackgroundGeometry = React.useMemo(() => new THREE.SphereGeometry(90, 128, 128), []);

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

  const sunLight = React.useMemo(() => new THREE.PointLight(0xffffff, 2000, 0), []);

  const handleResize = React.useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }, [camera, renderer]);

  const updateMeshHoverEmissiveColor = React.useCallback((meshName: string, emissive: boolean, color: number) => {
    switch (meshName) {
      case 'earthAtmosphere':
        earthAtmosphereMesh.material.color.setHex(color);
        earthAtmosphereMesh.material.emissive.setHex(color);
        earthAtmosphereMesh.material.emissive = emissive ? new THREE.Color(0x00b3ff) : new THREE.Color(0x000000);
        break;
      default:
        break;
    }
  }, [earthAtmosphereMesh.material]);



  const animate = React.useCallback(() => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.001;
    earthCloudsMesh.rotation.y += 0.0017;

    //Earth meshes orbits
    earthMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);
    earthCloudsMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthCloudsMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);
    earthAtmosphereMesh.position.x = earthDistance * Math.cos(earthMesh.rotation.y);
    earthAtmosphereMesh.position.z = earthDistance * Math.sin(earthMesh.rotation.y);

    controls.update();
    renderer.render(scene, camera);
  }, [camera, controls, earthAtmosphereMesh.position, earthCloudsMesh.position, earthCloudsMesh.rotation, earthMesh.position, earthMesh.rotation, renderer, scene]);



  useEffect(() => {
    if (typeof window !== 'undefined') {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      containerRef.current?.appendChild(renderer.domElement);

      // Camera distance from planet
      camera.position.z = 60;
      camera.position.x = 0;

      // Add inertia
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Lock panning
      controls.enablePan = false;

      // Lock camera rotation to the y axis
      // controls.minPolarAngle = Math.PI / 2;
      // controls.maxPolarAngle = Math.PI / 2;

      //Lock camera distance
      // controls.minDistance = 5;
      // controls.maxDistance = 5;

      //Sun Mesh
      sunMesh.scale.set(10, 10, 10);

      //Planet mesh render order
      earthMesh.renderOrder = 0;
      earthCloudsMesh.renderOrder = 1;

      // Planet inclination
      earthMesh.rotation.x = 0.23;
      earthCloudsMesh.rotation.x = 0.23;

      // Orbits
      earthMesh.position.x = earthDistance;
      earthCloudsMesh.position.x = earthDistance;
      earthAtmosphereMesh.position.x = earthDistance;

      //Milky way inclination
      starBackgroundMesh.rotation.x = 60.2;

      // Enable shadows
      earthMesh.castShadow = true;
      earthCloudsMesh.castShadow = true;
      earthMesh.receiveShadow = true;
      earthCloudsMesh.receiveShadow = true;
      sunLight.castShadow = true;

      // Add light
      sunMesh.add(sunLight);

      // Name objects
      earthMesh.name = 'earth';
      earthCloudsMesh.name = 'earthClouds';
      earthAtmosphereMesh.name = 'earthAtmosphere';
      sunMesh.name = 'sun';

      //Add objects to scene
      scene.add(sunLight);
      scene.add(earthMesh);
      scene.add(earthCloudsMesh);
      scene.add(earthAtmosphereMesh);
      scene.add(sunMesh);
      scene.add(starBackgroundMesh);
      animate();

      let previousObject = '';
      window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        //Ignore stars background mesh
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
      });

      window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          switch (intersects[0].object.name) {
            case 'earthAtmosphere':
              console.log('Earth clicked');
              break;
            case 'sun':
              console.log('Sun clicked');
              break;
            default:
              break;
          }
        }
      });

      window.addEventListener('resize', handleResize);
      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [renderer, scene, camera, controls, earthMesh, earthCloudsMesh, earthAtmosphereMesh, starBackgroundMesh, mouse, raycaster, handleResize, animate, updateMeshHoverEmissiveColor, sunMesh, sunLight]);

  return (
    <div ref={containerRef} />
  );
};

export default ThreeScene;