import React from 'react';
import {
  GraduationCap,
  CheckSquare,
  Award,
  FileText,
  Calendar,
  CreditCard,
  Bot,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AcademicMomentumRing3D } from '../../components/3d/AcademicMomentumRing3D';

interface StudentDashboardProps {
  onNavigate: (path: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const studentName = user?.name?.split(' ')[0] || 'Saikat';

  const quickStats = [
    {
      label: 'Overall Attendance',
      value: '87%',
      subtext: '146 / 167 Classes',
      trend: 'Safe Standing',
      icon: CheckSquare,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      path: '/student/attendance',
    },
    {
      label: 'Current CGPA',
      value: '9.94',
      subtext: 'Semester Performance ↑ 8.5%',
      trend: 'Rank #1 in CSE',
      icon: Award,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      path: '/student/marks',
    },
    {
      label: 'Assignments',
      value: '4 Pending',
      subtext: '2 Due Soon • 8 Completed',
      trend: 'Urgent: DBMS Due Tomorrow',
      icon: FileText,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      path: '/student/assignments',
    },
    {
      label: 'Upcoming Exams',
      value: '2 Scheduled',
      subtext: 'OS Midterm: Oct 12',
      trend: 'Hall Ticket Ready',
      icon: Calendar,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/30',
      path: '/student/exams',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-cyan-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SEMESTER 4 • ACADEMIC SESSION 2026-2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Good Morning, {studentName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Here's your live academic overview and campus intelligence.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('/student/ai')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Campus AI</span>
          </button>
          <button
            onClick={() => onNavigate('/student/profile')}
            className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-400/40 text-xs font-semibold transition-all flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Digital ID Card</span>
          </button>
        </div>
      </div>

      {/* Attendance Risk Banner Alert (Rule 11) */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300">
              ⚠ Attendance Threshold Alert: Operating Systems (CS403)
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Your attendance in Operating Systems is currently <b>81%</b>, approaching the minimum 75% institutional requirement.
              <span className="text-amber-300 font-semibold ml-1">
                Recommended: Attend the next 3 classes.
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('/student/attendance')}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition-colors"
        >
          Check Breakdown
        </button>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(stat.path)}
              className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl border ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">{stat.subtext}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 font-medium truncate">{stat.trend}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Central 3D Academic Progress & Momentum + Live Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3D Interactive Ring Section (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                ACADEMIC MOMENTUM
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Progress Hologram</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Interactive 3D
            </span>
          </div>

          <div className="py-2">
            <AcademicMomentumRing3D cgpa={9.94} momentumScore={82} onNavigate={onNavigate} />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Momentum Index: <b className="text-white">82 / 100</b></span>
            </div>
            <button
              onClick={() => onNavigate('/student/analytics')}
              className="text-cyan-400 font-semibold hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Deep Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Smart Deadlines & Upcoming Academic Events (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Smart Deadline Engine Card */}
          <div className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Smart Deadline Engine</h3>
                  <p className="text-[11px] text-slate-400">Algorithmic priority & workload weighting</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/student/assignments')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>View All 4</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div
                onClick={() => onNavigate('/student/assignments')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-rose-500/30 hover:border-rose-400 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-rose-300">
                      DBMS: Relational Normalization (3NF & BCNF)
                    </h5>
                    <p className="text-[10px] text-slate-400">Prof. Elena Rostova • Est: 2.5 hrs remaining</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    DUE TOMORROW
                  </span>
                </div>
              </div>

              <div
                onClick={() => onNavigate('/student/assignments')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/30 hover:border-amber-400 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-300">
                      Operating Systems: Multithreaded Kernel Scheduling
                    </h5>
                    <p className="text-[10px] text-slate-400">Dr. Linus Vance • Est: 4.0 hrs</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    IN 4 DAYS
                  </span>
                </div>
              </div>

              <div
                onClick={() => onNavigate('/student/assignments')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 hover:border-emerald-400 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Discrete Mathematics: Planar Graph Theorems
                    </h5>
                    <p className="text-[10px] text-slate-400">Dr. Srinivasa Rao • Est: 2.0 hrs</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    IN 7 DAYS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Academic Schedule & Exam Events */}
          <div className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Upcoming Exams & Milestones</h3>
                  <p className="text-[11px] text-slate-400">Auditorium hall tickets & project reviews</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/student/exams')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>View Hall Ticket</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => onNavigate('/student/exams')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                  OCT 12 • 10:00 AM
                </span>
                <h5 className="text-xs font-bold text-white mt-1">
                  Operating Systems Midterm
                </h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Auditorium Hall B • Seat B-34</p>
              </div>

              <div
                onClick={() => onNavigate('/student/timetable')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                  OCT 15 • 02:00 PM
                </span>
                <h5 className="text-xs font-bold text-white mt-1">
                  Capstone Project Review
                </h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Innovation Studio • Prof. Elena</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
