'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type Model3DProps = {
  modelPath?: string;
  className?: string;
};

export default function Model3D({
  modelPath = '/models/model.glb',
  className = 'w-full h-[500px]',
}: Model3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    
    // CAMERA SETUP - Tactical FOV
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // RENDERER SETUP - Optimized for HMR Stability and Performance
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // TACTICAL LIGHTING RIG
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // TACTICAL SHINE LIGHT - High Intensity White Light for Shine
    const shineLight = new THREE.PointLight(0xffffff, 60, 20); 
    shineLight.position.set(0, 2, 2);
    scene.add(shineLight);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; 
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false; // Disable full rotation for oscillation

    let loadedModel: THREE.Group | null = null;

    // OPTIMIZED GLB LOADER
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        loadedModel = gltf.scene;

        // Scale and Center Logic
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.8 / maxDim; 

        loadedModel.scale.setScalar(scale);
        loadedModel.position.sub(center.multiplyScalar(scale));
        
        scene.add(loadedModel);
      },
      undefined,
      (error) => console.error('3D Loading System Failure:', error)
    );

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Oscillation Protocol: Prevent backside from showing automatically
      if (loadedModel) {
        // Sway side-to-side +/- 0.4 radians (~23 degrees)
        loadedModel.rotation.y = Math.sin(time * 0.6) * 0.4;
      }
      
      // Dynamic shine light movement to create a shimmering effect
      shineLight.position.x = Math.sin(time) * 3;
      shineLight.position.z = Math.cos(time) * 3;
      shineLight.position.y = Math.sin(time * 0.5) * 2;
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return <div ref={containerRef} className={className} />;
}
