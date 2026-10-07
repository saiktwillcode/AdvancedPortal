import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AcademicMomentumRing3DProps {
  cgpa?: number;
  momentumScore?: number;
  className?: string;
  onNavigate?: (path: string) => void;
}

export const AcademicMomentumRing3D: React.FC<AcademicMomentumRing3DProps> = ({
  cgpa = 9.94,
  momentumScore = 82,
  className = '',
  onNavigate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Point Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const light1 = new THREE.PointLight(0x38bdf8, 4, 30);
    light1.position.set(5, 5, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x818cf8, 3, 30);
    light2.position.set(-6, -4, 6);
    scene.add(light2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Primary Torus Ring (Outer Momentum Track)
    const torusGeo = new THREE.TorusGeometry(3.6, 0.18, 24, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const mainRing = new THREE.Mesh(torusGeo, torusMat);
    rootGroup.add(mainRing);

    // Inner Torus Ring (Opposite rotation)
    const innerTorusGeo = new THREE.TorusGeometry(2.8, 0.12, 16, 80);
    const innerTorusMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0891b2,
      emissiveIntensity: 0.6,
    });
    const innerRing = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    innerRing.rotation.x = Math.PI / 4;
    rootGroup.add(innerRing);

    // Glowing Node Orbs placed on the ring
    const nodeCount = 5;
    const nodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.32, 20, 20);
    const colors = [0x38bdf8, 0x818cf8, 0x34d399, 0xf472b6, 0xfbbf24];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.set(Math.cos(angle) * 3.6, Math.sin(angle) * 3.6, 0);
      rootGroup.add(node);
      nodes.push(node);
    }

    // Sparkle particles
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.4 + Math.random() * 2.2;
      const th = Math.random() * Math.PI * 2;
      pPos[i * 3] = Math.cos(th) * r;
      pPos[i * 3 + 1] = Math.sin(th) * r;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(pGeo, pMat);
    rootGroup.add(particles);

    // Interactive Drag to Rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      rootGroup.rotation.y += deltaX * 0.01;
      rootGroup.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        rootGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.35;
        rootGroup.rotation.x = Math.cos(elapsed * 0.3) * 0.2 + 0.2;
      }

      innerRing.rotation.z += 0.01;
      particles.rotation.z -= 0.005;

      // Pulse nodes
      nodes.forEach((n, idx) => {
        const s = 1 + Math.sin(elapsed * 3 + idx) * 0.15;
        n.scale.set(s, s, s);
      });

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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        ref={mountRef}
        className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] cursor-grab active:cursor-grabbing"
      />

      {/* Central Glass HUD Overlay with CGPA & Momentum Score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="px-4 py-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-center shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <span className="text-[10px] tracking-wider font-bold text-cyan-400 uppercase">
            Current Standing
          </span>
          <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
            {cgpa.toFixed(2)}
          </div>
          <div className="flex items-center justify-center space-x-1 mt-0.5 text-xs text-slate-300">
            <span className="text-emerald-400 font-semibold">Momentum:</span>
            <span className="font-bold text-white">{momentumScore}/100</span>
          </div>
        </div>
      </div>

      {/* Quick Node Indicator Tags */}
      <div className="absolute top-2 left-4 text-[10px] font-semibold text-cyan-300 bg-slate-900/60 px-2 py-0.5 rounded-full border border-cyan-500/20">
        Attendance 87%
      </div>
      <div className="absolute top-2 right-4 text-[10px] font-semibold text-indigo-300 bg-slate-900/60 px-2 py-0.5 rounded-full border border-indigo-500/20">
        4 Assignments
      </div>
      <div className="absolute bottom-2 left-6 text-[10px] font-semibold text-emerald-300 bg-slate-900/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
        24 Credits
      </div>
      <div className="absolute bottom-2 right-6 text-[10px] font-semibold text-amber-300 bg-slate-900/60 px-2 py-0.5 rounded-full border border-amber-500/20">
        Top 0.5%
      </div>
    </div>
  );
};
