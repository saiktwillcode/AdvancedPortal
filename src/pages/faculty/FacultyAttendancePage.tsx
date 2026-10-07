import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Calendar,
  Save,
  CheckCircle,
  XCircle,
  Filter,
  Check,
  Search,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';

export const FacultyAttendancePage: React.FC = () => {
  const [course, setCourse] = useState('CS402');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([
    { id: 'usr_student_1', name: 'Saikat Khanra', roll: 'CSE2026042', status: 'PRESENT' as 'PRESENT' | 'ABSENT' },
    { id: 'usr_student_2', name: 'Aarav Patel', roll: 'CSE2026001', status: 'PRESENT' as 'PRESENT' | 'ABSENT' },
    { id: 'usr_student_3', name: 'Rohan Gupta', roll: 'CSE2026019', status: 'ABSENT' as 'PRESENT' | 'ABSENT' },
    { id: 'usr_student_4', name: 'Ananya Sharma', roll: 'CSE2026012', status: 'PRESENT' as 'PRESENT' | 'ABSENT' },
    { id: 'usr_student_5', name: 'Devendra Verma', roll: 'CSE2026027', status: 'PRESENT' as 'PRESENT' | 'ABSENT' },
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleStatus = (id: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, status: s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT' } : s))
    );
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    for (const st of students) {
      await api.markAttendance(course, st.id, st.status);
    }
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const markAll = (status: 'PRESENT' | 'ABSENT') => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            FACULTY COURSE INSTRUCTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Class Attendance Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Record, audit, and dispatch biometric RFID classroom attendance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => markAll('PRESENT')}
            className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Syncing...' : 'Save Attendance to DB'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Attendance records successfully persisted to institutional database ledger!</span>
        </div>
      )}

      {/* Control Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-wrap items-center gap-4 text-xs">
        <div>
          <label className="text-slate-400 mr-2">Course Module:</label>
          <select
            value={course}
            onChange={e => setCourse(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
          >
            <option value="CS402">CS402 — Database Management Systems</option>
            <option value="CS403">CS403 — Operating Systems</option>
          </select>
        </div>

        <div>
          <label className="text-slate-400 mr-2">Session Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
          />
        </div>

        <div className="ml-auto text-slate-400">
          Present: <b className="text-emerald-400">{students.filter(s => s.status === 'PRESENT').length}</b> / {students.length}
        </div>
      </div>

      {/* Student Attendance Marking Roster Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
            <tr>
              <th className="py-3.5 px-4">Roll Number</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Current Status</th>
              <th className="py-3.5 px-4 text-right">Toggle Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map(st => {
              const isPresent = st.status === 'PRESENT';
              return (
                <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-cyan-300">{st.roll}</td>
                  <td className="py-4 px-4 font-semibold text-white">{st.name}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        isPresent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(st.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isPresent
                          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      }`}
                    >
                      Switch to {isPresent ? 'ABSENT' : 'PRESENT'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
