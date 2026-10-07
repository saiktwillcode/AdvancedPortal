import React, { useState, useEffect } from 'react';
import {
  Award,
  TrendingUp,
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Sparkles,
  Zap,
  Calculator
} from 'lucide-react';
import { api } from '../../services/api';
import { SubjectMark, SemesterTrend } from '../../types';
import { MultiSemesterTrendChart } from '../../components/marks/MultiSemesterTrendChart';

export const StudentMarksPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [marksData, setMarksData] = useState<{
    cgpa: number;
    sgpa: number;
    semesterTrends: SemesterTrend[];
    subjects: SubjectMark[];
  } | null>(null);

  // CGPA Target Simulator
  const [targetEndSem, setTargetEndSem] = useState(19);

  useEffect(() => {
    api.getMarks().then(data => {
      setMarksData(data);
      setLoading(false);
    });
  }, []);

  if (loading || !marksData) {
    return (
      <div className="p-8 text-center text-slate-400 animate-pulse">
        <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
        <p className="text-sm">Calculating semester grade points and performance trends...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header with CGPA Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            OFFICIAL TRANSCRIPT EVALUATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Marks & Academic Performance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified academic performance records authenticated by University Examination Office.
          </p>
        </div>

        {/* Live Standing Badges */}
        <div className="flex items-center space-x-4 bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/30">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Cumulative CGPA</span>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
              {marksData.cgpa.toFixed(2)}
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Current SGPA</span>
            <div className="text-2xl font-black text-emerald-400">
              {marksData.sgpa.toFixed(2)}
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="hidden sm:block">
            <span className="text-[10px] text-emerald-400 font-bold block flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> ↑ 8.5%
            </span>
            <span className="text-[10px] text-slate-400">Semester Trend</span>
          </div>
        </div>
      </div>

      {/* Interactive Multi-Semester Subject Filter & Performance Trends Chart */}
      <MultiSemesterTrendChart />

      {/* Semester Progression Chart (Section 12) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Semester GPA Trajectory</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Performance has improved by 8.5%
          </span>
        </div>

        {/* Custom Visual Bar & Line Trajectory */}
        <div className="grid grid-cols-4 gap-4 h-48 items-end pt-6 px-4 pb-2 border-b border-white/10">
          {marksData.semesterTrends.map((st, i) => {
            const heightPct = ((st.sgpa - 9.0) / 1.0) * 80 + 20; // scale from 9.0 to 10.0
            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group">
                <span className="text-xs font-mono font-bold text-cyan-300 mb-2 group-hover:scale-110 transition-transform">
                  {st.sgpa.toFixed(2)}
                </span>
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full max-w-[60px] rounded-t-xl bg-gradient-to-t from-blue-700 via-cyan-500 to-teal-300 relative group-hover:brightness-125 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-white/60 rounded-t-xl" />
                </div>
                <span className="text-xs font-semibold text-slate-300 mt-2 font-mono">
                  {st.semester}
                </span>
                <span className="text-[10px] text-slate-500">{st.credits} Credits</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject-Wise Detailed Grade Sheet Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Current Semester Gradebook (Semester 4)</h3>
            <p className="text-xs text-slate-400">Internal, practical lab, midterm and end-semester evaluations</p>
          </div>
          <button
            onClick={() => alert('Official Grade Transcript PDF generated with institutional digital signature.')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Transcript</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-3">Credits</th>
                <th className="py-3.5 px-3">Internal (30)</th>
                <th className="py-3.5 px-3">Midterm (20)</th>
                <th className="py-3.5 px-3">Assignments (10)</th>
                <th className="py-3.5 px-3">End Sem (40/20)</th>
                <th className="py-3.5 px-3">Total (100)</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4 text-right">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {marksData.subjects.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-xs font-bold text-white block">{sub.subjectName}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{sub.subjectCode}</span>
                  </td>
                  <td className="py-4 px-3 font-mono text-slate-300">{sub.credits}</td>
                  <td className="py-4 px-3 font-mono text-white">{sub.internalMarks} / {sub.internalMax}</td>
                  <td className="py-4 px-3 font-mono text-white">{sub.midtermMarks} / {sub.midtermMax}</td>
                  <td className="py-4 px-3 font-mono text-white">{sub.assignmentMarks} / {sub.assignmentMax}</td>
                  <td className="py-4 px-3 font-mono text-white">{sub.endSemMarks}</td>
                  <td className="py-4 px-3 font-mono font-bold text-cyan-300">{sub.totalMarks} / {sub.totalMax}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-sm text-white">
                    {sub.gradePoint.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target CGPA Simulator Widget */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
        <div className="flex items-center space-x-2.5 mb-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Target CGPA Simulator</h3>
            <p className="text-xs text-slate-400">Simulate end-semester exam outcomes to project your final cumulative GPA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Estimated End-Sem Score in Operating Systems: <b className="text-cyan-400">{targetEndSem} / 20</b>
            </label>
            <input
              type="range"
              min="10"
              max="20"
              value={targetEndSem}
              onChange={e => setTargetEndSem(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-cyan-300 font-mono block">PROJECTED FINAL CGPA</span>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">
                {(9.90 + (targetEndSem / 20) * 0.08).toFixed(2)}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              Gold Medalist Track
            </span>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed">
            Maintaining 18+ marks keeps your cumulative CGPA safely above 9.94, guaranteeing rank 1 distinction in the Department of Computer Science.
          </div>
        </div>
      </div>
    </div>
  );
};
