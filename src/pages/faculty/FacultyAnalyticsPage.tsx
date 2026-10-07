import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckSquare,
  AlertTriangle,
  Sparkles,
  Filter
} from 'lucide-react';

export const FacultyAnalyticsPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS402');

  const gradeDistribution = [
    { grade: 'O (90-100%)', count: 34, pct: 26.5, color: 'from-emerald-600 to-teal-400' },
    { grade: 'A+ (80-89%)', count: 58, pct: 45.3, color: 'from-blue-600 to-cyan-400' },
    { grade: 'A (70-79%)', count: 24, pct: 18.7, color: 'from-indigo-600 to-violet-400' },
    { grade: 'B+ (60-69%)', count: 9, pct: 7.0, color: 'from-amber-600 to-yellow-400' },
    { grade: 'Below 60%', count: 3, pct: 2.3, color: 'from-rose-600 to-pink-500' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            COHORT PERFORMANCE METRICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Faculty Academic Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Grade distributions, attendance correlations, and curriculum pacing diagnostics.
          </p>
        </div>

        <div>
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-slate-950 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
          >
            <option value="CS402">CS402 — Database Management Systems</option>
            <option value="CS403">CS403 — Operating Systems</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10">
          <span className="text-xs text-slate-400">Class Average</span>
          <p className="text-2xl font-black text-white mt-1 font-mono">78.4%</p>
          <span className="text-[10px] text-emerald-400">↑ 3.2% from Midterm</span>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10">
          <span className="text-xs text-slate-400">Passing Rate</span>
          <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">97.6%</p>
          <span className="text-[10px] text-slate-400">125 of 128 Cleared</span>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10">
          <span className="text-xs text-slate-400">Attendance Baseline</span>
          <p className="text-2xl font-black text-cyan-300 mt-1 font-mono">86.2%</p>
          <span className="text-[10px] text-slate-400">Safe Department Avg</span>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10">
          <span className="text-xs text-amber-400">Intervention Needed</span>
          <p className="text-2xl font-black text-amber-400 mt-1 font-mono">3 Students</p>
          <span className="text-[10px] text-slate-400">Attendance &lt; 75%</span>
        </div>
      </div>

      {/* Grade Distribution Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>Student Grade Distribution ({selectedCourse})</span>
        </h3>

        <div className="space-y-3">
          {gradeDistribution.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">{item.grade}</span>
                <span className="font-mono text-slate-300">{item.count} Students ({item.pct}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-white/5">
                <div
                  style={{ width: `${item.pct * 2}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
