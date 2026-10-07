import React from 'react';
import {
  Users,
  CheckSquare,
  Award,
  FileText,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageSquare,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FacultyDashboardProps {
  onNavigate: (path: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Enrolled Students', value: '128', subtext: 'Across CS402 & CS403', icon: Users, color: 'text-indigo-400', path: '/faculty/students' },
    { label: 'Average Attendance', value: '86%', subtext: '3 Students Below 75%', icon: CheckSquare, color: 'text-cyan-400', path: '/faculty/attendance' },
    { label: 'Class Average Marks', value: '78%', subtext: 'Top Scorer: 9.94 CGPA', icon: Award, color: 'text-emerald-400', path: '/faculty/marks' },
    { label: 'Pending Evaluations', value: '12', subtext: 'DBMS Normalization Lab', icon: FileText, color: 'text-amber-400', path: '/faculty/assignments' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            FACULTY MANAGEMENT CONSOLE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Welcome, Professor Rostova
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department of Computer Science & Engineering • Academic Overview
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('/faculty/attendance')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mark Daily Attendance</span>
          </button>
          <button
            onClick={() => onNavigate('/faculty/messages')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Student Inquiries</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigate(st.path)}
              className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-indigo-400/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg group"
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

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-indigo-400">
                <span>Manage Module</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At-Risk Students Warning */}
        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Students Nearing Attendance Debarment</span>
            </h3>
            <button
              onClick={() => onNavigate('/faculty/attendance')}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              View Full Class Roster
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-white">Saikat Khanra (CSE2026042)</h5>
                <p className="text-[11px] text-slate-400">Operating Systems (CS403)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-amber-400">81.2% Attendance</span>
                <span className="text-[10px] text-slate-500 block">Needs 3 lectures</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-white">Rohan Gupta (CSE2026019)</h5>
                <p className="text-[11px] text-slate-400">Database Systems (CS402)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-rose-400">74.1% CRITICAL</span>
                <span className="text-[10px] text-rose-400 font-semibold block">Notice Dispatched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rapid Assessment Ledger */}
        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Upcoming Teaching Schedule</h3>
            <button
              onClick={() => onNavigate('/student/timetable')}
              className="text-xs text-indigo-400 font-semibold hover:underline"
            >
              Academic Calendar
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">11:00 AM - 12:30 PM</span>
                <h5 className="font-bold text-white">CS402: Database Management Systems (Lab B-2)</h5>
              </div>
              <button
                onClick={() => onNavigate('/faculty/attendance')}
                className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-[11px] hover:bg-indigo-500/30 transition-colors"
              >
                Mark Attendance
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">02:00 PM - 04:00 PM</span>
                <h5 className="font-bold text-white">B.Tech Capstone Project Mentorship Review</h5>
              </div>
              <button
                onClick={() => onNavigate('/faculty/students')}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-[11px] hover:bg-slate-700 transition-colors"
              >
                View Teams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
