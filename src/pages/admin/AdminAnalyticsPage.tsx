import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Building,
  GraduationCap,
  Users,
  Award,
  Sparkles
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const departmentMetrics = [
    { name: 'Computer Science & Engineering', students: 1250, faculty: 72, retention: 98.4, avgGpa: 8.84 },
    { name: 'Electronics & Communication', students: 940, faculty: 58, retention: 96.1, avgGpa: 8.52 },
    { name: 'Mechanical & Robotics', students: 820, faculty: 52, retention: 95.8, avgGpa: 8.38 },
    { name: 'Data Science & Artificial Intelligence', students: 680, faculty: 46, retention: 99.2, avgGpa: 9.02 },
    { name: 'Civil & Environmental Systems', students: 560, faculty: 42, retention: 94.7, avgGpa: 8.21 },
    { name: 'Mathematics & Computing', students: 600, faculty: 50, retention: 97.5, avgGpa: 8.79 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            INSTITUTIONAL METRICS & INTELLIGENCE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            University-Wide Academic Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department retention, enrollment trends, and academic benchmarking across 12 disciplines.
          </p>
        </div>
      </div>

      {/* Department Breakdown Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
            <tr>
              <th className="py-3.5 px-4">Department Program</th>
              <th className="py-3.5 px-3">Students</th>
              <th className="py-3.5 px-3">Faculty</th>
              <th className="py-3.5 px-3">Student-Faculty Ratio</th>
              <th className="py-3.5 px-3">Retention Rate</th>
              <th className="py-3.5 px-4 text-right">Avg Department GPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {departmentMetrics.map((dep, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">{dep.name}</td>
                <td className="py-4 px-3 font-mono text-cyan-300">{dep.students.toLocaleString()}</td>
                <td className="py-4 px-3 font-mono text-slate-300">{dep.faculty}</td>
                <td className="py-4 px-3 font-mono text-slate-400">{Math.round(dep.students / dep.faculty)} : 1</td>
                <td className="py-4 px-3 font-mono text-emerald-400 font-bold">{dep.retention}%</td>
                <td className="py-4 px-4 text-right font-mono font-black text-white text-sm">
                  {dep.avgGpa.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
