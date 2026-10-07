import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Bot,
  Zap,
  CheckCircle,
  Database,
  BarChart,
  Calendar,
  Lock,
  Trophy,
  Compass,
  Users,
  ChevronRight,
  Download,
  FileText
} from 'lucide-react';
import { CampusScene3D } from '../components/3d/CampusScene3D';
import { useAuth } from '../context/AuthContext';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { user, role } = useAuth();

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden bg-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next-Generation University Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Your Campus. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
              Your Data.
            </span> <br />
            Your Future.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A unified digital ecosystem connecting students, faculty, and university administration in real time with interactive 3D visualizations and intelligent academic acceleration.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate(user ? (role === 'STUDENT' ? '/student' : role === 'FACULTY' ? '/faculty' : '/admin') : '/student')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 group"
            >
              <span>Explore Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/login/student')}
              className="px-6 py-3.5 rounded-2xl bg-cyan-950/80 hover:bg-cyan-900/60 text-cyan-300 font-bold text-sm border border-cyan-400/50 shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>3D Student Gateway</span>
            </button>

            <button
              onClick={() => onNavigate('/login')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 shadow-lg transition-all"
            >
              All Roles Selection
            </button>

            <a
              href="#features"
              className="px-5 py-3.5 rounded-2xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              View System Architecture ↓
            </a>
          </div>
        </div>

        {/* 3D Campus Hero Experience */}
        <div className="relative mt-4">
          <CampusScene3D onNavigate={onNavigate} />
        </div>
      </section>

      {/* Quick Role Cards Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Card */}
          <div
            onClick={() => onNavigate('/student')}
            className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:-translate-y-1.5 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
              ROLE 01
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Student Suite</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Track live CGPA 9.94, attendance thresholds, smart deadlines, exam schedules, and interact with the 3D Academic Momentum Ring.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Student Portal</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Faculty Card */}
          <div
            onClick={() => onNavigate('/faculty')}
            className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-indigo-500/30 hover:border-indigo-400 transition-all hover:-translate-y-1.5 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
              ROLE 02
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Faculty Suite</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Manage 128 student rosters, record class attendance with one click, grade semester marks, publish notices, and analyze class performance.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Faculty Portal</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Admin Card */}
          <div
            onClick={() => onNavigate('/admin')}
            className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400 transition-all hover:-translate-y-1.5 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              ROLE 03
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Campus Command</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              University-wide governance over 4,850 students, 320 faculty, 3D Campus Command Center with real-time building occupancy & system telemetry.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Admin Command</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Major Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">
            High-Performance Digital Campus Architecture
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Engineered with modern WebGL 3D, Spring Boot enterprise standards, relational integrity, and proactive intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Campus AI Assistant</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Context-aware academic mentor with live access to student assignments, exam timetables, attendance alerts, and 7-day study planner generation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Smart Deadline Engine</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Algorithmic priority engine analyzing assignment difficulty, estimated completion duration, and proximity to examinations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <BarChart className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Live Grade & Attendance Risk</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Proactive threshold monitoring that detects declining attendance before it breaches institutional exam eligibility limits.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Interactive Timetable & Rooms</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Dynamic weekly scheduling with room locator, faculty details, clash detection, and personal study slot integration.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3D Digital Student ID</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Physics-based tilt ID card with dynamic holographic gradient sheen, official security watermark, and cryptographic QR verification.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Campus Command Twin</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Interactive 3D university map with live telemetry: library seat capacity, computer lab cluster load, cafeteria wait times, and sports facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 font-mono">
            ENGINEERING STACK
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">Built For Scale & Performance</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {[
            { name: 'React 19 & Vite', tag: 'High-Speed Frontend' },
            { name: 'Three.js & WebGL', tag: '3D Campus Rendering' },
            { name: 'Spring Boot 3', tag: 'RESTful Backend' },
            { name: 'MySQL Relational', tag: 'ACID Data Layer' },
            { name: 'Tailwind CSS v4', tag: 'Futuristic Glass UI' },
            { name: 'Gemini AI API', tag: 'Smart Academic LLM' },
          ].map((tech, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
              <p className="text-xs font-bold text-white">{tech.name}</p>
              <p className="text-[10px] text-cyan-400 mt-1 font-mono">{tech.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">STUDENT PORTAL SYSTEM</p>
              <p className="text-xs text-slate-400">One Campus. One Platform. Everything Connected.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('/student')} className="hover:text-cyan-400 transition-colors">Students</button>
            <button onClick={() => onNavigate('/faculty')} className="hover:text-cyan-400 transition-colors">Faculty</button>
            <button onClick={() => onNavigate('/admin')} className="hover:text-cyan-400 transition-colors">Administration</button>
            <button onClick={() => onNavigate('/student/campus')} className="hover:text-cyan-400 transition-colors">Campus Map</button>
            <button onClick={() => onNavigate('/login')} className="hover:text-cyan-400 transition-colors">Login Selection</button>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            © 2026 Student Portal System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
