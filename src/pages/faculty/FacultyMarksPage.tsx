import React, { useState, useEffect } from 'react';
import {
  Award,
  Save,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Sparkles,
  Search
} from 'lucide-react';
import { api } from '../../services/api';
import { SubjectMark } from '../../types';

export const FacultyMarksPage: React.FC = () => {
  const [course, setCourse] = useState('CS402');
  const [marks, setMarks] = useState<SubjectMark[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    api.getMarks().then(data => setMarks(data.subjects));
  }, []);

  const handleScoreChange = (id: string, field: keyof SubjectMark, val: number) => {
    setMarks(prev =>
      prev.map(m => {
        if (m.id !== id) return m;
        const updated = { ...m, [field]: Number(val) };
        const total = (updated.internalMarks || 0) + (updated.midtermMarks || 0) + (updated.assignmentMarks || 0) + (updated.labMarks || 0) + (updated.endSemMarks || 0);
        const pct = Math.round((total / updated.totalMax) * 100);
        return {
          ...updated,
          totalMarks: total,
          percentage: pct,
          gradePoint: pct >= 90 ? 10.0 : pct >= 80 ? 9.0 : 8.0,
          grade: pct >= 95 ? 'O (Outstanding)' : pct >= 90 ? 'A+ (Excellent)' : 'A (Very Good)',
        };
      })
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const m of marks) {
      await api.updateMark(m);
    }
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            EXAMINATION & GRADING LEDGER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Gradebook & Marks Entry Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-calculates aggregates, checks validation limits, and synchronizes transcripts.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Save & Publish Marks'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Marks successfully committed and published to Student Portals!</span>
        </div>
      )}

      {/* Marks Entry Grid */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">Editing Class: <b>CS402 — Database Management Systems (Semester 4)</b></span>
          <span className="text-xs text-cyan-400 font-mono">100% Real-Time Auto Summation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-3">Internal (/30)</th>
                <th className="py-3.5 px-3">Midterm (/20)</th>
                <th className="py-3.5 px-3">Assignment (/10)</th>
                <th className="py-3.5 px-3">Lab Practical (/20)</th>
                <th className="py-3.5 px-3">End Sem (/20)</th>
                <th className="py-3.5 px-3">Computed Total</th>
                <th className="py-3.5 px-4 text-right">Final Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {marks.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{sub.subjectName}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{sub.subjectCode}</span>
                  </td>

                  <td className="py-4 px-3">
                    <input
                      type="number"
                      max={sub.internalMax}
                      value={sub.internalMarks}
                      onChange={e => handleScoreChange(sub.id, 'internalMarks', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-xs focus:border-indigo-400 focus:outline-none"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <input
                      type="number"
                      max={sub.midtermMax}
                      value={sub.midtermMarks}
                      onChange={e => handleScoreChange(sub.id, 'midtermMarks', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-xs focus:border-indigo-400 focus:outline-none"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <input
                      type="number"
                      max={sub.assignmentMax}
                      value={sub.assignmentMarks}
                      onChange={e => handleScoreChange(sub.id, 'assignmentMarks', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-xs focus:border-indigo-400 focus:outline-none"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <input
                      type="number"
                      max={sub.labMax || 20}
                      value={sub.labMarks || 0}
                      onChange={e => handleScoreChange(sub.id, 'labMarks', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-xs focus:border-indigo-400 focus:outline-none"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <input
                      type="number"
                      max={sub.endSemMax}
                      value={sub.endSemMarks}
                      onChange={e => handleScoreChange(sub.id, 'endSemMarks', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-xs focus:border-indigo-400 focus:outline-none"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-mono font-bold text-sm text-cyan-300">
                      {sub.totalMarks} <span className="text-[10px] text-slate-500 font-normal">/ {sub.totalMax}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {sub.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
