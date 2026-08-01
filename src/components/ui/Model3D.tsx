
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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
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
    renderer.toneMappingExposure = 1.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // TACTICAL LIGHTING RIG
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // TACTICAL SHINE LIGHT - High Intensity White Light for orbital shine
    const shineLight = new THREE.PointLight(0xffffff, 100, 25); 
    shineLight.position.set(0, 2, 2);
    scene.add(shineLight);

    // TACTICAL GLOW LIGHT - Backside Halo Effect
    const glowLight = new THREE.PointLight(0xffffff, 40, 15);
    glowLight.position.set(0, 0, -2);
    scene.add(glowLight);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; 
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false; // Controlled by oscillation script

    let loadedModel: THREE.Group | null = null;

    // OPTIMIZED GLB LOADER
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        loadedModel = gltf.scene;

        // Scale and Center Logic - ENHANCED SIZE PROTOCOL
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.2 / maxDim; // BUMPED SCALE

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

      // Frontal Oscillation Protocol: Sway +/- 0.3 radians around the center
      // This ensures a heavy, majestic presence where the backside is never shown automatically
      if (loadedModel) {
        loadedModel.rotation.y = Math.sin(time * 0.5) * 0.3;
        loadedModel.rotation.x = Math.sin(time * 0.3) * 0.08; // Subtle majestic pitch
      }
      
      // Dynamic white shine light orbiting the front face
      shineLight.position.x = Math.sin(time * 1.5) * 4;
      shineLight.position.y = Math.cos(time * 1.5) * 4;
      shineLight.position.z = 3;
      
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
