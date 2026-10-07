import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle,
  AlertTriangle,
  X,
  Award,
  BookOpen
} from 'lucide-react';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';

export const FacultyStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    api.getStudents().then(data => setStudents(data));
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase())) ||
    (s.department && s.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            STUDENT ROSTER & ACADEMIC AUDIT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Student Cohort Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Inspect individual student momentum, attendance alerts, and GPA records.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search student by name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-white/10 focus:border-indigo-400 focus:outline-none text-white text-xs"
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
            <tr>
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Department & Program</th>
              <th className="py-3.5 px-3">Semester</th>
              <th className="py-3.5 px-3">Attendance</th>
              <th className="py-3.5 px-3">CGPA</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(st => (
              <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-cyan-300">{st.studentId}</td>
                <td className="py-4 px-4 font-bold text-white">{st.name}</td>
                <td className="py-4 px-4 text-slate-300">{st.department}</td>
                <td className="py-4 px-3 font-mono text-slate-400">Sem {st.semester}</td>
                <td className="py-4 px-3">
                  <span
                    className={`font-mono font-bold ${
                      st.attendancePercentage < 75
                        ? 'text-rose-400'
                        : st.attendancePercentage < 85
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {st.attendancePercentage}%
                  </span>
                </td>
                <td className="py-4 px-3 font-mono font-black text-white">{st.cgpa}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => setSelectedStudent(st)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 hover:border-cyan-400 transition-colors inline-flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedStudent.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={selectedStudent.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/40"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedStudent.name}</h3>
                <p className="text-xs font-mono text-cyan-300">{selectedStudent.studentId}</p>
                <p className="text-[11px] text-slate-400">{selectedStudent.department}</p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-2xl bg-slate-950/60 p-4 border border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Current CGPA:</span>
                <span className="font-mono font-black text-emerald-400 text-sm">{selectedStudent.cgpa} / 10.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Attendance:</span>
                <span className="font-mono font-bold text-white">{selectedStudent.attendancePercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Academic Momentum:</span>
                <span className="font-bold text-cyan-300">{selectedStudent.academicMomentum || 82} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="text-white font-mono">{selectedStudent.contactNumber}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
