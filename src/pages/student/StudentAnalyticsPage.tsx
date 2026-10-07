import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Activity,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';
import { AcademicMomentumRing3D } from '../../components/3d/AcademicMomentumRing3D';

export const StudentAnalyticsPage: React.FC = () => {
  const momentumFactors = [
    { title: 'Classroom Attendance Rate', value: '87%', score: 87, weight: 'High Weight', desc: 'Above 75% baseline; approaching OS limit' },
    { title: 'Assignment Submission Velocity', value: '92%', score: 92, weight: 'Critical', desc: '8 of 8 past deliverables submitted on time' },
    { title: 'Exam Performance Index', value: '98%', score: 98, weight: 'Top Tier', desc: 'Rank #1 in CSE Department (9.94 CGPA)' },
    { title: 'Weekly Study Lab Consistency', value: '18 hrs', score: 78, weight: 'Steady', desc: 'Average 3.6 hours self-study per day' },
    { title: 'Upcoming Deadline Clearance', value: '2 Pending', score: 75, weight: 'Medium', desc: 'DBMS due tomorrow requires completion' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            PREDICTIVE LEARNING ANALYTICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Academic Momentum & Performance Diagnostics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic activity vector measuring attendance, deadlines, and learning velocity.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Momentum Score: 82 / 100</span>
        </div>
      </div>

      {/* Main Grid: 3D Visualization + Scoring Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Academic Momentum Ring */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 p-6 flex flex-col items-center shadow-2xl">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
            MOMENTUM RADAR VECTOR
          </span>
          <h3 className="text-xl font-bold text-white mb-2">Strong Academic Momentum</h3>
          <p className="text-xs text-slate-400 text-center mb-4">
            Composite index of current course engagement, attendance buffer, and homework turnaround.
          </p>

          <AcademicMomentumRing3D cgpa={9.94} momentumScore={82} />
        </div>

        {/* Right: Component Factors Breakdown */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Academic Momentum Factor Matrix</span>
          </h3>

          <div className="space-y-3 pt-2">
            {momentumFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{factor.title}</h4>
                    <p className="text-[11px] text-slate-400">{factor.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-cyan-300 text-sm">{factor.value}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{factor.weight}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${factor.score}%` }}
                    className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 h-full rounded-full transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
