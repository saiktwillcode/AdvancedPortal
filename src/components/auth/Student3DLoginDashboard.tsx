import React, { useState } from 'react';
import {
  GraduationCap,
  Fingerprint,
  Key,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Cpu,
  Radio,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StudentLoginGateway3D } from '../3d/StudentLoginGateway3D';

interface Student3DLoginDashboardProps {
  onBackToRoles: () => void;
  onNavigate: (path: string) => void;
}

export const Student3DLoginDashboard: React.FC<Student3DLoginDashboardProps> = ({
  onBackToRoles,
  onNavigate,
}) => {
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<'biometric' | 'credentials' | 'express'>('biometric');
  const [studentId, setStudentId] = useState('saikat.cse26@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Trigger Biometric / RFID Scan Simulation
  const handleTriggerBiometric = async () => {
    setIsScanning(true);
    setScanStep('Initiating biometric RFID hardware scan...');

    setTimeout(() => {
      setScanStep('Matching thumbprint & RFID token against University Ledger...');
    }, 600);

    setTimeout(() => {
      setScanStep('Cryptographic signature verified: Saikat Khanra (CSE2026042)');
      setAuthSuccess(true);
    }, 1200);

    setTimeout(async () => {
      await login('STUDENT', studentId, password);
      onNavigate('/student');
    }, 1900);
  };

  // Trigger Standard Credential Submit
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setScanStep('Authenticating credentials with Spring Boot & MySQL...');

    setTimeout(() => {
      setAuthSuccess(true);
      setScanStep('Access Granted. Entering Student Portal...');
    }, 700);

    setTimeout(async () => {
      await login('STUDENT', studentId, password);
      onNavigate('/student');
    }, 1400);
  };

  return (
    <div className="w-full max-w-5xl rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_60px_rgba(6,182,212,0.15)] overflow-hidden animate-scale-up">
      {/* Top Header Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
        <button
          onClick={onBackToRoles}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Select Different Role</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-cyan-300">
            STUDENT 3D GATEWAY TERMINAL v4.2
          </span>
        </div>
      </div>

      {/* Main Dual-Column 3D Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Column: Interactive 3D Holographic Core (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-blue-950/30 via-slate-950 to-slate-950 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  IDENTITY GATEWAY
                </h4>
                <p className="text-sm font-bold text-white">Quantum Security Core</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Move cursor over 3D model to tilt. Core rotates dynamically during authentication.
            </p>
          </div>

          {/* 3D Three.js Canvas Scene */}
          <div className="my-2 h-[260px] md:h-[300px]">
            <StudentLoginGateway3D
              isAuthenticating={isScanning}
              authSuccess={authSuccess}
            />
          </div>

          {/* Live Student Identity Badge HUD */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] uppercase font-mono">Verified Scholar</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>CGPA 9.94</span>
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Saikat Khanra"
                className="w-9 h-9 rounded-xl object-cover border border-cyan-400/40"
              />
              <div className="min-w-0">
                <h5 className="font-bold text-white text-xs truncate">Saikat Khanra</h5>
                <p className="text-[10px] text-cyan-300 font-mono">ID: CSE2026042 • B.Tech CSE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Innovative Multi-Mode Login Console (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          {/* Authentication Mode Tabs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Student Portal Access
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your preferred authentication mechanism.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                ENCRYPTED GATEWAY
              </span>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('biometric')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  authMode === 'biometric'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Fingerprint className="w-4 h-4" />
                <span className="hidden sm:inline">RFID & Biometric</span>
                <span className="sm:hidden">Biometric</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('credentials')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  authMode === 'credentials'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Passcode</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('express')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  authMode === 'express'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Fast Pass</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Biometric & RFID Touch ID */}
          {authMode === 'biometric' && (
            <div className="space-y-6 text-center animate-fade-in my-auto py-4">
              <div className="max-w-sm mx-auto">
                {/* Interactive Holographic Fingerprint Scanner Pad */}
                <div
                  onClick={!isScanning ? handleTriggerBiometric : undefined}
                  className={`relative w-36 h-36 mx-auto rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group ${
                    isScanning
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_35px_rgba(6,182,212,0.4)]'
                      : 'border-cyan-500/40 hover:border-cyan-400 bg-slate-950/70 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                  }`}
                >
                  {/* Laser Scan Line Animation */}
                  {isScanning && (
                    <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#38bdf8] animate-bounce-slow" />
                  )}

                  <Fingerprint
                    className={`w-16 h-16 transition-transform group-hover:scale-110 ${
                      authSuccess
                        ? 'text-emerald-400'
                        : isScanning
                        ? 'text-cyan-300 animate-pulse'
                        : 'text-cyan-400'
                    }`}
                  />

                  <span className="text-[10px] font-mono text-cyan-300 font-bold mt-2">
                    {authSuccess ? 'VERIFIED' : isScanning ? 'SCANNING...' : 'TAP TO SCAN'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-semibold mt-4">
                  Touch biometric sensor or hold RFID smart card to terminal.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Synchronized with Saikat Khanra's registered institutional profile.
                </p>
              </div>

              {/* Status readout */}
              {isScanning && (
                <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-xs font-mono text-cyan-300 animate-fade-in">
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{scanStep}</span>
                  </div>
                </div>
              )}

              {!isScanning && (
                <button
                  type="button"
                  onClick={handleTriggerBiometric}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Authenticate with Campus Biometrics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Mode 2: Student Credentials & Passcode */}
          {authMode === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 animate-fade-in my-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Student Roll Number / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    placeholder="CSE2026042 or saikat.cse26@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Student Portal Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                  <span>Save session on this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset verification dispatched to saikat.cse26@university.edu')}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Key?
                </button>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
              >
                {isScanning ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Sign In to Student Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Mode 3: 1-Click Fast Pass */}
          {authMode === 'express' && (
            <div className="space-y-5 animate-fade-in my-auto py-2">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-950 to-cyan-950/40 border border-cyan-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                    1-CLICK DEMO PROFILE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    VERIFIED ENROLLMENT
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                    alt="Saikat Khanra"
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-cyan-400/50"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">Saikat Khanra</h4>
                    <p className="text-xs text-slate-300">Roll: CSE2026042 • Semester 4</p>
                    <p className="text-[11px] text-emerald-400 font-mono font-semibold">
                      CGPA: 9.94 • Attendance: 87%
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  Pre-loaded presentation profile with active live grade tracking, timetable slots, direct faculty messages, and 3D Academic Momentum.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTriggerBiometric}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Launch Saikat's Dashboard Instantly</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Footer Security Badges */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>TLS 1.3 End-to-End Cryptography</span>
            </div>
            <span className="font-mono text-cyan-300">Port 3000 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
