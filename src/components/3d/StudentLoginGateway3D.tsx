import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StudentLoginGateway3DProps {
  isAuthenticating?: boolean;
  authSuccess?: boolean;
  className?: string;
}

export const StudentLoginGateway3D: React.FC<StudentLoginGateway3DProps> = ({
  isAuthenticating = false,
  authSuccess = false,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x0284c7, 0.7);
    scene.add(ambient);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 4, 30);
    pointLight1.position.set(4, 5, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 3, 30);
    pointLight2.position.set(-4, -3, 5);
    scene.add(pointLight2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Floor Cyber Grid
    const grid = new THREE.GridHelper(24, 24, 0x0ea5e9, 0x1e293b);
    grid.position.y = -2.5;
    rootGroup.add(grid);

    // Outer Cyber Hologram Ring
    const outerRingGeo = new THREE.TorusGeometry(2.8, 0.08, 16, 100);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    rootGroup.add(outerRing);

    // Middle Ring (Rotates opposite axis)
    const midRingGeo = new THREE.TorusGeometry(2.3, 0.06, 16, 80);
    const midRingMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI / 3;
    rootGroup.add(midRing);

    // Inner Ring
    const innerRingGeo = new THREE.TorusGeometry(1.8, 0.05, 16, 60);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.y = Math.PI / 4;
    rootGroup.add(innerRing);

    // Central Floating Holographic Core (Octahedron Security Crystal)
    const coreGeo = new THREE.OctahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Inner Glowing Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    rootGroup.add(innerSphere);

    // Orbiting Data Particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      pPos[i * 3] = Math.cos(theta) * radius;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pPos[i * 3 + 2] = Math.sin(theta) * radius;
      pSpeeds.push(0.01 + Math.random() * 0.02);
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(pGeo, pMat);
    rootGroup.add(particleSystem);

    // Mouse Tracking Parallax
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = x * 0.35;
      targetY = y * 0.2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotation multiplier during authentication
      const speedMult = isAuthenticating ? 3.5 : authSuccess ? 6.0 : 1.0;

      rootGroup.rotation.y += 0.005 * speedMult;
      rootGroup.rotation.y += (targetX - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetY - rootGroup.rotation.x) * 0.05;

      outerRing.rotation.z += 0.008 * speedMult;
      midRing.rotation.x += 0.012 * speedMult;
      innerRing.rotation.y -= 0.015 * speedMult;

      coreMesh.rotation.x = elapsed * 0.8 * speedMult;
      coreMesh.rotation.y = elapsed * 1.2 * speedMult;

      // Pulse inner sphere
      const pulse = 1 + Math.sin(elapsed * 4 * speedMult) * (isAuthenticating ? 0.3 : 0.1);
      innerSphere.scale.set(pulse, pulse, pulse);

      // Change core color on success
      if (authSuccess) {
        innerSphereMat.color.setHex(0x10b981); // Emerald on success
      } else if (isAuthenticating) {
        innerSphereMat.color.setHex(0x38bdf8); // Cyan surge
      }

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAuthenticating, authSuccess]);

  return (
    <div className={`relative w-full h-full min-h-[380px] overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD Tags */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>QUANTUM GATEWAY: READY</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-white/5">
            NODE #718-SP
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="bg-slate-900/60 px-2 py-1 rounded-md border border-white/5">
            RFID: 13.56 MHz
          </span>
          <span className="bg-slate-900/60 px-2 py-1 rounded-md border border-white/5 text-emerald-400">
            ENCRYPTION: AES-256
          </span>
        </div>
      </div>
    </div>
  );
};
