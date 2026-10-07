import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  GraduationCap,
  Layers,
  Shield,
  ArrowRight,
  Zap,
  Sparkles as SparklesIcon,
  CheckCircle,
  LucideIcon
} from 'lucide-react';
import { UserRole } from '../../types';
import { soundEffects } from '../../utils/audioSynth';

interface RoleConfig {
  role: UserRole;
  title: string;
  badge: string;
  subtitle: string;
  demoUser: string;
  demoId: string;
  metrics: string;
  primaryColor: string;
  glowColor: string;
  accentHex: number;
  icon: LucideIcon;
  positionX: number;
}

const ROLES_DATA: RoleConfig[] = [
  {
    role: 'STUDENT',
    title: 'STUDENT',
    badge: 'QUANTUM BIOMETRIC GATEWAY',
    subtitle: '3D biometric scan, real-time grades, schedule & momentum',
    demoUser: 'Saikat Khanra',
    demoId: 'CSE2026042',
    metrics: 'CGPA 9.94 • Sem 4',
    primaryColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    accentHex: 0x06b6d4,
    icon: GraduationCap,
    positionX: -3.6,
  },
  {
    role: 'FACULTY',
    title: 'FACULTY',
    badge: 'ACADEMIC EVALUATION SUITE',
    subtitle: 'Manage rosters, mark attendance, enter grades & broadcast',
    demoUser: 'Prof. Elena Rostova',
    demoId: 'FAC8812',
    metrics: '128 Students • 4 Courses',
    primaryColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    accentHex: 0x8b5cf6,
    icon: Layers,
    positionX: 0,
  },
  {
    role: 'ADMIN',
    title: 'ADMIN',
    badge: 'CAMPUS COMMAND CENTER',
    subtitle: 'Full institution digital twin, RBAC governance & audit telemetry',
    demoUser: 'Dean Marcus Vance',
    demoId: 'ADM001',
    metrics: '4,850 Students • 100% Online',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    accentHex: 0xf59e0b,
    icon: Shield,
    positionX: 3.6,
  },
];

// Holographic 3D Spinning Emblem for each role
const RoleHologramArtifact: React.FC<{ role: UserRole; isHovered: boolean; accentHex: number }> = ({
  role,
  isHovered,
  accentHex,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const speed = isHovered ? 2.8 : 1.0;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8 * speed;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 1.2 * speed;
      coreRef.current.rotation.z += delta * 0.6 * speed;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.4 * speed;
      ring1Ref.current.rotation.y -= delta * 0.9 * speed;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 1.1 * speed;
      ring2Ref.current.rotation.y += delta * 1.5 * speed;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.05, 0.25]}>
      {/* Dynamic Point Light cast from inside the emblem */}
      <pointLight
        color={accentHex}
        intensity={isHovered ? 4.5 : 1.8}
        distance={3.5}
      />

      {role === 'STUDENT' && (
        <>
          {/* Holographic Quantum Core */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color={0x38bdf8}
              emissive={0x0284c7}
              emissiveIntensity={isHovered ? 1.6 : 0.8}
              roughness={0.1}
              metalness={0.9}
              wireframe={false}
            />
          </mesh>
          {/* Orbiting Ring */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[0.55, 0.025, 16, 48]} />
            <meshStandardMaterial
              color={0x06b6d4}
              emissive={0x0891b2}
              emissiveIntensity={isHovered ? 1.4 : 0.6}
            />
          </mesh>
        </>
      )}

      {role === 'FACULTY' && (
        <>
          {/* Prismatic Diamond Crystal */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.36, 0]} />
            <meshStandardMaterial
              color={0xa78bfa}
              emissive={0x7c3aed}
              emissiveIntensity={isHovered ? 1.6 : 0.8}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Dual Nested Gimbal Rings */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[0.55, 0.025, 16, 48]} />
            <meshStandardMaterial
              color={0x8b5cf6}
              emissive={0x6d28d9}
              emissiveIntensity={isHovered ? 1.4 : 0.6}
            />
          </mesh>
          <mesh ref={ring2Ref}>
            <torusGeometry args={[0.68, 0.02, 16, 48]} />
            <meshStandardMaterial
              color={0xc084fc}
              emissive={0x9333ea}
              emissiveIntensity={isHovered ? 1.4 : 0.6}
            />
          </mesh>
        </>
      )}

      {role === 'ADMIN' && (
        <>
          {/* Institutional Command Polyhedron */}
          <mesh ref={coreRef}>
            <dodecahedronGeometry args={[0.36, 0]} />
            <meshStandardMaterial
              color={0xfbbf24}
              emissive={0xd97706}
              emissiveIntensity={isHovered ? 1.6 : 0.8}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Hexagonal Shield Orbit Ring */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[0.56, 0.03, 16, 6]} />
            <meshStandardMaterial
              color={0xf59e0b}
              emissive={0xb45309}
              emissiveIntensity={isHovered ? 1.4 : 0.6}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

// 3D Glassmorphic Role Selection Card
interface Role3DCardProps {
  config: RoleConfig;
  onSelectRole: (role: UserRole) => void;
  onFastLogin: (role: UserRole) => void;
  scaleFactor: number;
  spacingFactor: number;
}

const Role3DCard: React.FC<Role3DCardProps> = ({
  config,
  onSelectRole,
  onFastLogin,
  scaleFactor,
  spacingFactor,
}) => {
  const cardGroupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pointerLocal, setPointerLocal] = useState({ x: 0, y: 0 });

  const posX = config.positionX * spacingFactor;
  const Icon = config.icon;

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    // Smooth hover rotation tilt based on local cursor position
    if (isHovered) {
      const targetRotX = -pointerLocal.y * 0.45;
      const targetRotY = pointerLocal.x * 0.45;
      const targetPosZ = 0.85;

      cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.x,
        targetRotX,
        delta * 8
      );
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        targetRotY,
        delta * 8
      );
      cardGroupRef.current.position.z = THREE.MathUtils.lerp(
        cardGroupRef.current.position.z,
        targetPosZ,
        delta * 7
      );
    } else {
      // Gentle idle floating bob
      const time = state.clock.elapsedTime;
      const idleBob = Math.sin(time * 1.4 + config.positionX) * 0.08;

      cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.x,
        0,
        delta * 5
      );
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        0,
        delta * 5
      );
      cardGroupRef.current.position.z = THREE.MathUtils.lerp(
        cardGroupRef.current.position.z,
        0,
        delta * 5
      );
      cardGroupRef.current.position.y = THREE.MathUtils.lerp(
        cardGroupRef.current.position.y,
        idleBob,
        delta * 4
      );
    }
  });

  const handlePointerMove = (e: any) => {
    // Calculate normalized -1 to +1 cursor offset within the card
    if (e.point && cardGroupRef.current) {
      const local = cardGroupRef.current.worldToLocal(e.point.clone());
      setPointerLocal({
        x: Math.max(-1, Math.min(1, local.x / 1.5)),
        y: Math.max(-1, Math.min(1, local.y / 2.0)),
      });
    }
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    soundEffects.playHover(config.role === 'STUDENT' ? 520 : config.role === 'FACULTY' ? 440 : 380);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setPointerLocal({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    soundEffects.playSelect(config.role === 'STUDENT' ? 620 : config.role === 'FACULTY' ? 540 : 460);
    onSelectRole(config.role);
  };

  return (
    <group
      ref={cardGroupRef}
      position={[posX, 0, 0]}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
    >
      {/* Interactive Raycast Hitbox & 3D Glass Slab */}
      <mesh
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleCardClick}
      >
        <boxGeometry args={[3.2, 4.4, 0.2]} />
        <meshPhysicalMaterial
          color={0x0b1329}
          transmission={0.88}
          roughness={0.12}
          metalness={0.15}
          ior={1.45}
          thickness={0.8}
          specularIntensity={1.0}
          transparent={true}
          opacity={0.88}
          emissive={config.accentHex}
          emissiveIntensity={isHovered ? 0.35 : 0.08}
        />
      </mesh>

      {/* Holographic Glowing Border Rim */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[3.24, 4.44, 0.04]} />
        <meshBasicMaterial
          color={config.accentHex}
          wireframe={true}
          transparent={true}
          opacity={isHovered ? 0.9 : 0.35}
        />
      </mesh>

      {/* 3D Spinning Holographic Emblem inside Upper Half of Card */}
      <RoleHologramArtifact
        role={config.role}
        isHovered={isHovered}
        accentHex={config.accentHex}
      />

      {/* Glassmorphic Pinned HTML Interface Layer */}
      <Html
        transform
        distanceFactor={6.8}
        position={[0, 0, 0.14]}
        style={{
          width: '320px',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          className={`p-6 rounded-3xl transition-all duration-300 border ${
            isHovered
              ? 'bg-slate-900/90 border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.4)]'
              : 'bg-slate-950/75 border-white/10 hover:border-white/20 shadow-xl'
          } backdrop-blur-xl text-left flex flex-col justify-between h-[440px]`}
          style={{
            borderColor: isHovered ? config.primaryColor : undefined,
            boxShadow: isHovered ? `0 0 35px ${config.glowColor}` : undefined,
          }}
        >
          {/* Card Top: Holographic Anchor Spacer & Role Tag */}
          <div>
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full font-bold border"
                style={{
                  color: config.primaryColor,
                  borderColor: `${config.primaryColor}55`,
                  backgroundColor: `${config.primaryColor}15`,
                }}
              >
                {config.badge}
              </span>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center border transition-transform duration-300"
                style={{
                  color: config.primaryColor,
                  borderColor: `${config.primaryColor}40`,
                  backgroundColor: `${config.primaryColor}20`,
                  transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Empty space matching 3D spinning emblem height */}
            <div className="h-28 flex items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 opacity-60">
                3D Holographic Beacon
              </span>
            </div>

            {/* Role Header & Description */}
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>{config.title}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
              {config.subtitle}
            </p>

            {/* Verified Demo Badge */}
            <div className="mt-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="min-w-0 pr-2">
                <span className="text-[9px] text-slate-400 font-mono block uppercase">
                  ACTIVE PROFILE
                </span>
                <span className="font-bold text-white text-xs truncate block">
                  {config.demoUser}
                </span>
              </div>
              <span
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg border whitespace-nowrap"
                style={{
                  color: config.primaryColor,
                  borderColor: `${config.primaryColor}40`,
                  backgroundColor: `${config.primaryColor}10`,
                }}
              >
                {config.demoId}
              </span>
            </div>
          </div>

          {/* Action Buttons: Standard Login vs 1-Click Fast Pass */}
          <div className="space-y-2 pt-2">
            <button
              onClick={e => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 shadow-md group"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColor}, #1e293b)`,
              }}
            >
              <span>Enter {config.title} Portal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={e => {
                e.stopPropagation();
                soundEffects.playSelect(650);
                onFastLogin(config.role);
              }}
              className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>1-Click Instant Demo Launch</span>
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Camera Parallax Rig responding to global pointer coordinates
const CameraParallaxRig: React.FC = () => {
  useFrame(({ camera, pointer }, delta) => {
    // Subtle, organic mouse parallax
    const targetX = pointer.x * 1.1;
    const targetY = pointer.y * 0.45;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 0.1, delta * 3);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// Background Cyber Architecture (Dynamic Grid & Orbiting Halo)
const BackgroundEnvironment: React.FC = () => {
  const haloRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Cyber Floor Grid */}
      <gridHelper
        args={[36, 36, 0x0ea5e9, 0x1e293b]}
        position={[0, -2.8, -2]}
        rotation={[0, 0, 0]}
      />

      {/* Background Rotating Celestial Halo */}
      <group ref={haloRef} position={[0, 0, -5]}>
        <mesh>
          <torusGeometry args={[7.2, 0.04, 16, 120]} />
          <meshBasicMaterial color={0x0284c7} transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[8.4, 0.03, 16, 100]} />
          <meshBasicMaterial color={0x6366f1} transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[9.6, 0.02, 16, 80]} />
          <meshBasicMaterial color={0xf59e0b} transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Cyber Dust Particle Constellations */}
      <Sparkles count={75} scale={14} size={2.5} speed={0.4} color="#38bdf8" />
      <Sparkles count={50} scale={12} size={2.0} speed={0.3} color="#a855f7" />
      <Sparkles count={35} scale={10} size={1.8} speed={0.5} color="#fbbf24" />
    </group>
  );
};

// Master 3D Scene Controller
interface R3FRoleCardsSceneProps {
  onSelectRole: (role: UserRole) => void;
  onFastLogin: (role: UserRole) => void;
}

const ResponsiveSceneContents: React.FC<R3FRoleCardsSceneProps> = ({
  onSelectRole,
  onFastLogin,
}) => {
  const { viewport } = useThree();

  // Responsive scale and spacing according to viewport width
  const isNarrow = viewport.width < 9.5;
  const isMobile = viewport.width < 6.5;

  const scaleFactor = isMobile ? 0.72 : isNarrow ? 0.85 : 1.0;
  const spacingFactor = isMobile ? 0.6 : isNarrow ? 0.85 : 1.0;

  return (
    <>
      <CameraParallaxRig />
      <BackgroundEnvironment />

      {/* Lighting Suite */}
      <ambientLight intensity={0.65} color={0xdbeafe} />
      <directionalLight position={[0, 6, 8]} intensity={1.2} color={0xffffff} />
      <pointLight position={[-4, 3, 4]} intensity={2.5} color={0x06b6d4} distance={15} />
      <pointLight position={[0, 3, 4]} intensity={2.5} color={0x8b5cf6} distance={15} />
      <pointLight position={[4, 3, 4]} intensity={2.5} color={0xf59e0b} distance={15} />

      {/* Three 3D Glassmorphic Role Selection Cards */}
      {ROLES_DATA.map(config => (
        <Role3DCard
          key={config.role}
          config={config}
          onSelectRole={onSelectRole}
          onFastLogin={onFastLogin}
          scaleFactor={scaleFactor}
          spacingFactor={spacingFactor}
        />
      ))}
    </>
  );
};

export const R3FRoleCardsScene: React.FC<R3FRoleCardsSceneProps> = ({
  onSelectRole,
  onFastLogin,
}) => {
  return (
    <div className="w-full h-[620px] md:h-[680px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ResponsiveSceneContents
          onSelectRole={onSelectRole}
          onFastLogin={onFastLogin}
        />
      </Canvas>
    </div>
  );
};
