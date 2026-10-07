import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  UploadCloud,
  X,
  Filter,
  ArrowRight,
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Assignment } from '../../types';

export const StudentAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'DUE_SOON' | 'COMPLETED'>('ALL');
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionFile, setSubmissionFile] = useState<string | null>(null);

  useEffect(() => {
    api.getAssignments().then(data => setAssignments(data));
  }, []);

  const handleOpenSubmit = (asg: Assignment) => {
    setSelectedAsg(asg);
    setSubmittingId(asg.id);
    setSubmissionFile(null);
    setSubmitSuccess(false);
  };

  const handlePerformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingId) return;

    const res = await api.submitAssignment(submittingId);
    if (res.success) {
      setAssignments(prev =>
        prev.map(a => (a.id === submittingId ? { ...a, status: 'SUBMITTED' } : a))
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedAsg(null);
        setSubmittingId(null);
        setSubmitSuccess(false);
      }, 1500);
    }
  };

  const filtered = assignments.filter(asg => {
    if (filter === 'PENDING') return asg.status === 'PENDING' || asg.status === 'DUE_SOON';
    if (filter === 'DUE_SOON') return asg.status === 'DUE_SOON';
    if (filter === 'COMPLETED') return asg.status === 'SUBMITTED' || asg.status === 'GRADED';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
            <span>ALGORITHMIC PRIORITY ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Assignment Hub & Smart Deadlines
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculated urgency matrix based on deadline proximity, difficulty, and study workload.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/10">
          {(['ALL', 'PENDING', 'DUE_SOON', 'COMPLETED'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(asg => {
          const isHigh = asg.priority === 'HIGH';
          const isMedium = asg.priority === 'MEDIUM';
          const isCompleted = asg.status === 'SUBMITTED' || asg.status === 'GRADED';

          return (
            <div
              key={asg.id}
              className={`p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-500/30'
                  : isHigh
                  ? 'border-rose-500/40 shadow-rose-500/10'
                  : isMedium
                  ? 'border-amber-500/30 shadow-amber-500/10'
                  : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded-md border border-white/10">
                    {asg.subjectCode} • {asg.subjectName}
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isHigh ? '🟥 HIGH PRIORITY' : isMedium ? '🟧 MEDIUM' : '🟩 LOW'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Est: <b className="text-white">{asg.estimatedHours} hrs</b></span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Due: <b className="text-white">{new Date(asg.dueDate).toLocaleDateString()}</b>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {isCompleted ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{asg.grade ? `Graded: ${asg.grade}` : 'Submitted'}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenSubmit(asg)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Submit Solution</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedAsg(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center animate-scale-up">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Submission Uploaded!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Sent directly to {selectedAsg.subjectName} grading ledger.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                  DELIVERABLE SUBMISSION
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedAsg.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Upload code files, PDF report, or benchmark logs.</p>

                <form onSubmit={handlePerformSubmit} className="mt-5 space-y-4">
                  {/* File Upload Box */}
                  <label className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition-colors">
                    <UploadCloud className="w-8 h-8 text-cyan-400 mb-2 animate-bounce-slow" />
                    <span className="text-xs font-semibold text-white">
                      {submissionFile ? submissionFile : 'Choose PDF or ZIP code archive'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">Max file size 25MB • Authenticated Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setSubmissionFile(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Student Notes / Git Repository URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/saikat/normalization-project"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity"
                  >
                    Confirm & Submit Solution
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
