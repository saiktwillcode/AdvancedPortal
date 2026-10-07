import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CampusSceneProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

export const CampusScene3D: React.FC<CampusSceneProps> = ({ onNavigate, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 3, 50);
    pointLight.position.set(0, 15, 0);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 40);
    cyanLight.position.set(-15, 8, 10);
    scene.add(cyanLight);

    // Campus Root Group
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(80, 40, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -0.05;
    campusGroup.add(gridHelper);

    // Circular ground disc with glow
    const discGeo = new THREE.CircleGeometry(38, 64);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x070d1d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = -Math.PI / 2;
    discMesh.position.y = -0.1;
    campusGroup.add(discMesh);

    // Outer cyber rings
    const ringGeo = new THREE.RingGeometry(38, 38.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -0.04;
    campusGroup.add(ringMesh);

    // Materials
    const buildingMatDark = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
    });

    const buildingMatGlass = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });

    const neonCyan = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const neonViolet = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const neonBlue = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

    // Function to build a futuristic campus building
    const createBuilding = (
      x: number,
      z: number,
      w: number,
      h: number,
      d: number,
      neonMat: THREE.Material,
      name: string
    ) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, 0, z);

      // Main Block
      const baseGeo = new THREE.BoxGeometry(w, h, d);
      const baseMesh = new THREE.Mesh(baseGeo, buildingMatDark);
      baseMesh.position.y = h / 2;
      bGroup.add(baseMesh);

      // Glass Inset
      const glassGeo = new THREE.BoxGeometry(w * 0.92, h * 0.85, d * 0.92);
      const glassMesh = new THREE.Mesh(glassGeo, buildingMatGlass);
      glassMesh.position.y = h / 2;
      bGroup.add(glassMesh);

      // Neon Top Border Accent
      const borderGeo = new THREE.BoxGeometry(w * 1.02, 0.4, d * 1.02);
      const borderMesh = new THREE.Mesh(borderGeo, neonMat);
      borderMesh.position.y = h;
      bGroup.add(borderMesh);

      // Antenna / Spire
      if (h > 9) {
        const spireGeo = new THREE.CylinderGeometry(0.08, 0.2, 4, 8);
        const spireMesh = new THREE.Mesh(spireGeo, neonMat);
        spireMesh.position.y = h + 2;
        bGroup.add(spireMesh);

        // Blinking beacon
        const beaconGeo = new THREE.SphereGeometry(0.3, 12, 12);
        const beaconMesh = new THREE.Mesh(beaconGeo, neonCyan);
        beaconMesh.position.y = h + 4;
        bGroup.add(beaconMesh);
      }

      bGroup.userData = { name };
      campusGroup.add(bGroup);
      return bGroup;
    };

    // Central Academic Rotunda / Grand Tech Tower
    createBuilding(0, 0, 7, 14, 7, neonBlue, 'Academic Hub');
    createBuilding(0, 0, 9, 3, 9, neonCyan, 'Academic Base');

    // Turing Computer Science Lab
    createBuilding(-12, -6, 5, 9, 6, neonCyan, 'Turing Lab');

    // Central University Library
    createBuilding(12, -5, 6, 8, 7, neonViolet, 'Central Library');

    // Science & Research Wing
    createBuilding(-9, 10, 5, 6, 5, neonBlue, 'Science Wing');

    // Administrative Tower
    createBuilding(10, 9, 4.5, 11, 4.5, neonCyan, 'Admin Tower');

    // Innovation & Robotics Center
    createBuilding(0, -14, 7, 5, 4.5, neonViolet, 'Robotics Hub');

    // Floating Data Beams (Light Columns)
    const beamGeo = new THREE.CylinderGeometry(0.15, 0.15, 26, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const beam1 = new THREE.Mesh(beamGeo, beamMat);
    beam1.position.set(0, 13, 0);
    campusGroup.add(beam1);

    // Orbiting Data Nodes / Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 26;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 1 + Math.random() * 16;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      particleSpeeds.push(0.003 + Math.random() * 0.006);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.6,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    campusGroup.add(particleSystem);

    // Mouse Tracking for Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = mouseX * 0.35;
      targetRotationX = -mouseY * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle rotation + mouse tilt
      campusGroup.rotation.y += 0.002;
      campusGroup.rotation.y += (targetRotationY - campusGroup.rotation.y) * 0.05;
      campusGroup.rotation.x += (targetRotationX - campusGroup.rotation.x) * 0.05;

      // Animate particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        const angle = Math.atan2(z, x) + particleSpeeds[i];
        const dist = Math.sqrt(x * x + z * z);
        array[i * 3] = Math.cos(angle) * dist;
        array[i * 3 + 2] = Math.sin(angle) * dist;
        array[i * 3 + 1] += Math.sin(elapsedTime * 2 + i) * 0.02;
      }
      posAttr.needsUpdate = true;

      // Pulse beam
      beamMat.opacity = 0.25 + Math.sin(elapsedTime * 3) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Floating Labels that user can directly click
  const quickLinks = [
    { label: 'Attendance', path: '/student/attendance', position: 'top-16 left-6 md:left-16' },
    { label: 'Marks & CGPA', path: '/student/marks', position: 'top-28 right-6 md:right-20' },
    { label: 'AI Assistant', path: '/student/ai', position: 'bottom-28 left-8 md:left-24' },
    { label: 'Timetable', path: '/student/timetable', position: 'bottom-32 right-8 md:right-24' },
    { label: 'Exams', path: '/student/exams', position: 'top-10 md:top-14 left-1/2 -translate-x-1/2' },
  ];

  return (
    <div className={`relative w-full h-[450px] md:h-[580px] overflow-hidden rounded-3xl ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Interactive 3D Holographic Badges */}
      <div className="absolute inset-0 pointer-events-none">
        {quickLinks.map((link, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate && onNavigate(link.path)}
            className={`pointer-events-auto absolute ${link.position} group px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-xs font-semibold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all duration-300 flex items-center space-x-1.5 animate-bounce-slow`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/70 to-transparent pointer-events-none" />
    </div>
  );
};
