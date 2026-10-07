import React from 'react';
import {
  Users,
  Building,
  BookOpen,
  GraduationCap,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Server,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Enrolled Students', value: '4,850', subtext: '12 Engineering Programs', icon: GraduationCap, color: 'text-cyan-400', path: '/admin/students' },
    { label: 'University Faculty & Staff', value: '320', subtext: 'PhD Scholars & Researchers', icon: Users, color: 'text-indigo-400', path: '/admin/faculty' },
    { label: 'Accredited Courses', value: '86', subtext: 'All Curriculum Registered', icon: BookOpen, color: 'text-emerald-400', path: '/admin/courses' },
    { label: 'Academic Departments', value: '12', subtext: 'Computer Science, ECE, Mech...', icon: Building, color: 'text-amber-400', path: '/admin/analytics' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            OFFICE OF ACADEMIC AFFAIRS & REGISTRAR
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            University Governance Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Welcome, Dean Marcus Vance • Global Campus Infrastructure & Academic Oversight
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('/admin/command')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            <Building className="w-4 h-4" />
            <span>Open 3D Campus Command Twin</span>
          </button>
        </div>
      </div>

      {/* Institutional Statistics Grid (Section 26) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigate(st.path)}
              className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{st.label}</span>
                <div className="p-2 rounded-xl bg-slate-800/80 text-white group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${st.color}`} />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-3xl font-black text-white">{st.value}</span>
                <p className="text-xs text-slate-400 mt-0.5">{st.subtext}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400">
                <span>Manage Registry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Showcase: Campus Command Center Callout */}
      <div
        onClick={() => onNavigate('/admin/command')}
        className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-2 border-amber-500/40 shadow-2xl hover:border-amber-400 transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              CAMPUS COMMAND CENTER
            </span>
            <span className="text-xs text-emerald-400 font-bold">● Live 3D University Digital Twin</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Real-Time Building Telemetry & Spatial Sensor Hub
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Monitor real-time occupancy across Central Library (342 students), Turing Computer Lab (86 pods), Academic Hall Alpha (610 seats), and sports arenas.
          </p>
        </div>

        <button className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 group-hover:scale-105 transition-transform flex items-center space-x-2 shadow-lg shadow-amber-500/20">
          <span>Launch 3D Command Twin</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Admin Modules Operations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigate('/admin/students')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Student Enrollment CRUD</h4>
          <p className="text-xs text-slate-400 mt-1">Enroll new admissions, issue IDs, update program tracks.</p>
        </div>

        <div
          onClick={() => onNavigate('/admin/courses')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Course Management</h4>
          <p className="text-xs text-slate-400 mt-1">Configure credit weightings, prerequisites, and faculty allocations.</p>
        </div>

        <div
          onClick={() => onNavigate('/admin/users')}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber-500/40 cursor-pointer transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">RBAC Role Access</h4>
          <p className="text-xs text-slate-400 mt-1">Assign Student, Faculty, and Admin permissions with token revocation.</p>
        </div>
      </div>
    </div>
  );
};
