import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Calendar,
  Filter,
  ArrowRight,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { api } from '../../services/api';
import { SubjectAttendance } from '../../types';

export const StudentAttendancePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState<{
    overallPercentage: number;
    totalAttended: number;
    totalClasses: number;
    subjects: SubjectAttendance[];
  } | null>(null);

  // Simulator state
  const [simSubject, setSimSubject] = useState('CS403');
  const [simAttendNext, setSimAttendNext] = useState(3);

  useEffect(() => {
    api.getAttendance().then(data => {
      setAttendanceData(data);
      setLoading(false);
    });
  }, []);

  if (loading || !attendanceData) {
    return (
      <div className="p-8 text-center text-slate-400 animate-pulse">
        <CheckSquare className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
        <p className="text-sm">Loading verified biometric attendance records...</p>
      </div>
    );
  }

  // Simulation calculation
  const selectedSubject = attendanceData.subjects.find(s => s.subjectCode === simSubject) || attendanceData.subjects[2];
  const simulatedTotal = selectedSubject.totalClasses + simAttendNext;
  const simulatedAttended = selectedSubject.attendedClasses + simAttendNext;
  const simulatedPct = Math.round((simulatedAttended / simulatedTotal) * 100);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            CAMPUS BIOMETRIC RFID MONITOR
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Subject Attendance Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Minimum institutional eligibility threshold is set at 75% per semester.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-950/80 p-3 rounded-2xl border border-cyan-500/30">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Cumulative Attendance</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {attendanceData.overallPercentage}%
            </p>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="text-xs space-y-0.5">
            <p className="text-slate-300">Attended: <b className="text-emerald-400">{attendanceData.totalAttended}</b></p>
            <p className="text-slate-400">Total: <b>{attendanceData.totalClasses}</b></p>
          </div>
        </div>
      </div>

      {/* Attendance Risk Detection Alert Banner (Section 11) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ATTENDANCE RISK DETECTED
              </span>
              <span className="text-xs text-slate-400">CS403: Operating Systems</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Your attendance in Operating Systems is approaching the minimum threshold.
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Current standing: <b className="text-amber-400">81%</b>. Institutional cutoff: <b>75%</b>.
              Missing even 2 more lectures risks academic debarment for midterm hall ticket issuance.
            </p>
            <div className="mt-2 text-xs font-semibold text-cyan-300 flex items-center space-x-1">
              <span>Recommended Directive:</span>
              <span className="text-white font-bold bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/30">
                Attend the next 3 consecutive classes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Progress Subject Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {attendanceData.subjects.map(sub => {
          const isWarning = sub.riskStatus === 'WARNING';
          const circumference = 2 * Math.PI * 42;
          const strokeDashoffset = circumference - (sub.percentage / 100) * circumference;

          return (
            <div
              key={sub.id}
              className={`p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                isWarning
                  ? 'border-amber-500/40 hover:border-amber-400 shadow-amber-500/10'
                  : 'border-white/10 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {sub.subjectCode}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5 leading-snug">
                    {sub.subjectName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sub.facultyName}</p>
                </div>

                {/* Circular Progress Gauge */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      className="stroke-slate-800"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      className={isWarning ? 'stroke-amber-400' : 'stroke-cyan-400'}
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-white">{sub.percentage}%</span>
                    <span className="text-[9px] text-slate-400 font-mono">RATIO</span>
                  </div>
                </div>
              </div>

              {/* Detail Metrics */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Classes: <b className="text-white">{sub.attendedClasses}</b> / {sub.totalClasses}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isWarning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isWarning ? 'AT RISK' : 'HEALTHY'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive What-If Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Attendance Forecast Simulator</h3>
            <p className="text-xs text-slate-400">Model how attending or missing future classes impacts your semester grade eligibility.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Select Subject</label>
            <select
              value={simSubject}
              onChange={e => setSimSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            >
              {attendanceData.subjects.map(s => (
                <option key={s.subjectCode} value={s.subjectCode}>
                  {s.subjectCode} — {s.subjectName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Attend Next Consecutive Classes: <b className="text-cyan-400">{simAttendNext}</b>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={simAttendNext}
              onChange={e => setSimAttendNext(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-cyan-300 font-mono block">PROJECTED STANDING</span>
              <p className="text-xl font-black text-white">{simulatedPct}%</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              simulatedPct >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {simulatedPct >= 85 ? 'Safe Buffer' : 'Recovering'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
