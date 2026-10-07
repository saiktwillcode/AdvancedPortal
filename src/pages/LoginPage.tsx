import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  Shield,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  CheckCircle,
  Sparkles,
  Info,
  Volume2,
  VolumeX,
  Box,
  LayoutGrid,
  Zap,
  FileText,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Student3DLoginDashboard } from '../components/auth/Student3DLoginDashboard';
import { R3FRoleCardsScene } from '../components/3d/R3FRoleCardsScene';
import { soundEffects } from '../utils/audioSynth';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('student')) {
      return 'STUDENT';
    }
    return null;
  });
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const demoAccounts = {
    STUDENT: {
      title: 'STUDENT',
      subtitle: '3D Biometric & Quantum Academic Gateway',
      idLabel: 'Student ID / Email',
      demoId: 'saikat.cse26@university.edu',
      name: 'Saikat Khanra (CSE2026042)',
      color: 'from-blue-600 via-cyan-500 to-teal-400',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      icon: GraduationCap,
      redirect: '/student',
    },
    FACULTY: {
      title: 'FACULTY',
      subtitle: 'Manage your classroom & evaluation',
      idLabel: 'Employee ID / Faculty Email',
      demoId: 'elena.rostova@university.edu',
      name: 'Prof. Elena Rostova (FAC8812)',
      color: 'from-indigo-600 via-violet-500 to-purple-400',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      icon: Layers,
      redirect: '/faculty',
    },
    ADMIN: {
      title: 'ADMIN',
      subtitle: 'Control the digital university ecosystem',
      idLabel: 'Admin ID / Governance Email',
      demoId: 'admin.vance@university.edu',
      name: 'Dean Marcus Vance (ADM001)',
      color: 'from-amber-600 via-orange-500 to-yellow-400',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      icon: Shield,
      redirect: '/admin',
    },
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setIdentifier(demoAccounts[role].demoId);
    setError('');
  };

  const handleFastLogin = async (role: UserRole) => {
    try {
      await login(role, demoAccounts[role].demoId, 'password123');
      onNavigate(demoAccounts[role].redirect);
    } catch {
      setError('Unable to authenticate. Please try again.');
    }
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playSelect(550);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setError('');

    try {
      await login(selectedRole, identifier, password);
      onNavigate(demoAccounts[selectedRole].redirect);
    } catch {
      setError('Unable to authenticate. Please check your credentials or use the demo login.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 bg-slate-950 relative overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/15 via-amber-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 my-auto">
        {!selectedRole ? (
          /* STEP 1: 3D REACT THREE FIBER ROLE SELECTION GATEWAY */
          <div className="animate-fade-in text-center flex flex-col items-center">
            {/* Top Status & Controls Header */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-2 px-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-mono tracking-wider">IMMERSIVE 3D PORTAL GATEWAY</span>
              </div>

              {/* View & Audio Controls */}
              <div className="flex items-center space-x-2 text-xs">
                {/* 3D vs 2D View Switcher */}
                <div className="p-1 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center space-x-1 backdrop-blur-md">
                  <button
                    onClick={() => {
                      setViewMode('3d');
                      soundEffects.playSelect(500);
                    }}
                    className={`px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                      viewMode === '3d'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Space</span>
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('2d');
                      soundEffects.playSelect(500);
                    }}
                    className={`px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                      viewMode === '2d'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>2D Grid</span>
                  </button>
                </div>

                {/* Sound FX Toggle */}
                <button
                  onClick={toggleAudio}
                  title={audioEnabled ? 'Mute audio synthesizer' : 'Enable audio synthesizer'}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-white/10 transition-colors backdrop-blur-md"
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Portal Title */}
            <div className="max-w-2xl mx-auto px-4 mt-2">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                SELECT YOUR PORTAL
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hover to tilt dynamic 3D glassmorphic cards in real-time space. Select your institutional role to unlock your authenticated environment.
              </p>
            </div>

            {/* 3D React Three Fiber Stage or 2D Accessible Grid */}
            {viewMode === '3d' ? (
              <div className="w-full my-2">
                <R3FRoleCardsScene
                  onSelectRole={handleRoleSelect}
                  onFastLogin={handleFastLogin}
                />
              </div>
            ) : (
              /* Fallback 2D Glassmorphic Grid */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 w-full max-w-5xl px-4">
                {(Object.keys(demoAccounts) as UserRole[]).map(roleKey => {
                  const item = demoAccounts[roleKey];
                  const Icon = item.icon;
                  return (
                    <div
                      key={roleKey}
                      onClick={() => handleRoleSelect(roleKey)}
                      className={`p-7 rounded-3xl bg-slate-900/85 backdrop-blur-xl border ${item.borderColor} shadow-xl hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(37,99,235,0.25)] transition-all duration-300 cursor-pointer group text-left flex flex-col justify-between h-[360px]`}
                    >
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-transform">
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mt-4 block font-bold">
                          PORTAL GATEWAY
                        </span>
                        <h3 className="text-2xl font-black text-white mt-1 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4">
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl bg-white/10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
                        >
                          <span>Enter as {item.title}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleFastLogin(roleKey);
                          }}
                          className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-950 border border-white/10 flex items-center justify-center space-x-1.5"
                        >
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span>1-Click Fast Pass</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom 1-Click Demo Profile Switcher Strip */}
            <div className="mt-2 w-full max-w-4xl p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px]">Instant Demo Accounts:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleFastLogin('STUDENT')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center space-x-1.5 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student (Saikat)</span>
                </button>

                <button
                  onClick={() => handleFastLogin('FACULTY')}
                  className="px-3 py-1.5 rounded-xl bg-violet-950/60 hover:bg-violet-900/80 text-violet-300 border border-violet-500/40 text-[11px] font-bold flex items-center space-x-1.5 transition-all hover:scale-105"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Faculty (Prof. Elena)</span>
                </button>

                <button
                  onClick={() => handleFastLogin('ADMIN')}
                  className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center space-x-1.5 transition-all hover:scale-105"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin (Dean Vance)</span>
                </button>
              </div>
            </div>
          </div>
        ) : selectedRole === 'STUDENT' ? (
          /* STEP 2A: STUDENT 3D BIOMETRIC & QUANTUM LOGIN DASHBOARD */
          <Student3DLoginDashboard
            onBackToRoles={() => setSelectedRole(null)}
            onNavigate={onNavigate}
          />
        ) : (
          /* STEP 2B: FACULTY & ADMIN LOGIN CONSOLE */
          <div className="animate-scale-up max-w-md mx-auto rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/30 p-8 shadow-2xl">
            {/* Back Button */}
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to 3D Portal Gateway</span>
            </button>

            {/* Role Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                {React.createElement(demoAccounts[selectedRole].icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {demoAccounts[selectedRole].title} Login
                </h3>
                <p className="text-xs text-slate-400">
                  {demoAccounts[selectedRole].subtitle}
                </p>
              </div>
            </div>

            {/* Demo Credential Pill */}
            <div className="mb-6 p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono block">DEMO ACCOUNT</span>
                <span className="font-semibold text-white">{demoAccounts[selectedRole].name}</span>
              </div>
              <button
                type="button"
                onClick={() => setIdentifier(demoAccounts[selectedRole].demoId)}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold hover:bg-cyan-500/30 transition-colors"
              >
                Auto-Fill
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {demoAccounts[selectedRole].idLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="Enter email or ID..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered university email.')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2 mt-4"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter {demoAccounts[selectedRole].title} Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
