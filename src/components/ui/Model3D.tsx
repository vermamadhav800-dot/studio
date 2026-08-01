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

    // RENDERER SETUP - Elite Quality
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

    // TACTICAL LIGHTING RIG - HIGH GLOW
    // 1. Hemisphere Light for soft global illumination
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // 2. Main Directional Light for sharp highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 3. Neon Glow Light (Primary Glow Source)
    const glowLight = new THREE.PointLight(0xBAFF00, 15, 20); // Intense Volt Green
    glowLight.position.set(0, 2, 2);
    scene.add(glowLight);

    // 4. Rim Light for silhouette definition
    const rimLight = new THREE.SpotLight(0xffffff, 10);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Keep it focused
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;

    // OPTIMIZED GLB LOADER
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Scale and Center Logic
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.8 / maxDim; // Tactical size increase

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        
        // Material Boost
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.metalness = 0.8;
              mesh.material.roughness = 0.2;
              mesh.material.envMapIntensity = 2.5;
              // Emissive boost if possible
              if (mesh.material.emissive) {
                mesh.material.emissive.setHex(0xBAFF00);
                mesh.material.emissiveIntensity = 0.5;
              }
            }
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => console.error('3D Loading System Failure:', error)
    );

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Dynamic glow movement
      glowLight.position.x = Math.sin(Date.now() * 0.002) * 2;
      
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
