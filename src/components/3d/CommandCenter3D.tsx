import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FacilityStatus } from '../../types';
import { Building2, Users, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface CommandCenter3DProps {
  facilities: FacilityStatus[];
  onSelectBuilding?: (facility: FacilityStatus) => void;
  className?: string;
}

export const CommandCenter3D: React.FC<CommandCenter3DProps> = ({
  facilities,
  onSelectBuilding,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<FacilityStatus | null>(facilities[0] || null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 28, 48);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // Grid Floor
    const grid = new THREE.GridHelper(100, 50, 0x0284c7, 0x1e293b);
    grid.position.y = -0.05;
    mapGroup.add(grid);

    // Building Meshes with Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const buildingMeshes: THREE.Mesh[] = [];

    // Building blueprints corresponding to facilities
    const buildingColors: Record<string, number> = {
      LIBRARY: 0x8b5cf6,
      LAB: 0x06b6d4,
      ACADEMIC: 0x3b82f6,
      SPORTS: 0x10b981,
      ADMIN: 0xf59e0b,
      CAFETERIA: 0xec4899,
    };

    facilities.forEach(fac => {
      const bColor = buildingColors[fac.category] || 0x3b82f6;
      const bGeo = new THREE.BoxGeometry(7, 8 + Math.random() * 6, 7);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.8,
        emissive: bColor,
        emissiveIntensity: 0.15,
      });

      const mesh = new THREE.Mesh(bGeo, bMat);
      mesh.position.set(fac.coordinates.x, bGeo.parameters.height / 2, fac.coordinates.z);
      mesh.userData = { facility: fac };
      mapGroup.add(mesh);
      buildingMeshes.push(mesh);

      // Top glowing indicator ring
      const topRingGeo = new THREE.RingGeometry(2.5, 3.2, 32);
      const topRingMat = new THREE.MeshBasicMaterial({
        color: bColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const topRing = new THREE.Mesh(topRingGeo, topRingMat);
      topRing.rotation.x = -Math.PI / 2;
      topRing.position.set(fac.coordinates.x, bGeo.parameters.height + 0.1, fac.coordinates.z);
      mapGroup.add(topRing);

      // Holographic marker pin above building
      const pinGeo = new THREE.OctahedronGeometry(0.8);
      const pinMat = new THREE.MeshBasicMaterial({ color: bColor });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(fac.coordinates.x, bGeo.parameters.height + 2.5, fac.coordinates.z);
      mapGroup.add(pin);
    });

    // Click handler for 3D buildings
    const onPointerDown = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes);

      if (intersects.length > 0) {
        const fac = intersects[0].object.userData.facility as FacilityStatus;
        if (fac) {
          setSelectedFacility(fac);
          if (onSelectBuilding) onSelectBuilding(fac);
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);

    // Subtle automatic camera panning
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mapGroup.rotation.y = Math.sin(elapsed * 0.1) * 0.1;
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
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [facilities]);

  return (
    <div className={`relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-pointer" />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>CAMPUS DIGITAL TWIN: LIVE TELEMETRY</span>
        </div>
        <div className="pointer-events-auto flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>All 6 Hubs Online</span>
        </div>
      </div>

      {/* Interactive Facility Detail Drawer on the Right */}
      {selectedFacility && (
        <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-80 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 p-5 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
              Facility Node #{selectedFacility.id}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {selectedFacility.status}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span>{selectedFacility.name}</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="rounded-xl bg-slate-800/60 p-2.5 border border-slate-700/50">
              <span className="text-[10px] text-slate-400">Occupancy</span>
              <p className="text-base font-bold text-white mt-0.5">
                {selectedFacility.currentOccupancy} <span className="text-xs font-normal text-slate-400">/ {selectedFacility.maxCapacity}</span>
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/60 p-2.5 border border-slate-700/50">
              <span className="text-[10px] text-slate-400">Available Seats</span>
              <p className="text-base font-bold text-cyan-300 mt-0.5">
                {selectedFacility.availableSeats}
              </p>
            </div>
          </div>

          {selectedFacility.specialMetric && (
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
              {selectedFacility.specialMetric}
            </div>
          )}

          <div className="mt-4 flex space-x-2">
            {facilities.map(fac => (
              <button
                key={fac.id}
                onClick={() => setSelectedFacility(fac)}
                className={`text-[10px] px-2 py-1 rounded-lg border transition-all ${
                  selectedFacility.id === fac.id
                    ? 'bg-cyan-500/30 border-cyan-400 text-white font-bold'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {fac.category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
