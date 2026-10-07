import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  X,
  GraduationCap
} from 'lucide-react';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';

export const AdminStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    semester: 4,
    cgpa: 8.5,
    attendancePercentage: 85,
  });

  useEffect(() => {
    api.getStudents().then(data => setStudents(data));
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.createStudent(newStudent);
    if (res.success) {
      setStudents(prev => [...prev, res.student]);
      setShowAddModal(false);
      setNewStudent({
        name: '',
        email: '',
        studentId: '',
        department: 'Computer Science & Engineering',
        semester: 4,
        cgpa: 8.5,
        attendancePercentage: 85,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this student record from the institution database?')) {
      await api.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            REGISTRAR ENROLLMENT DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Student Admissions & Records CRUD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or revoke student credentials and enrollment identifiers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search enrolled students..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {filtered.length} Active Records
        </span>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
            <tr>
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-3">Semester</th>
              <th className="py-3.5 px-3">CGPA</th>
              <th className="py-3.5 px-3">Attendance</th>
              <th className="py-3.5 px-4 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(st => (
              <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-cyan-300">{st.studentId}</td>
                <td className="py-4 px-4 font-bold text-white">{st.name}</td>
                <td className="py-4 px-4 text-slate-400 font-mono">{st.email}</td>
                <td className="py-4 px-3 font-mono text-slate-300">Sem {st.semester}</td>
                <td className="py-4 px-3 font-mono font-black text-emerald-400">{st.cgpa}</td>
                <td className="py-4 px-3 font-mono font-bold text-white">{st.attendancePercentage}%</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleDelete(st.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Remove Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Enroll New Student</h3>
            <p className="text-xs text-slate-400 mb-4">Generates institutional RFID credential and database record.</p>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Priyanshu Roy"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={newStudent.email}
                  onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="priyanshu@university.edu"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={newStudent.studentId}
                    onChange={e => setNewStudent({ ...newStudent, studentId: e.target.value })}
                    placeholder="CSE2026105"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Semester</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={newStudent.semester}
                    onChange={e => setNewStudent({ ...newStudent, semester: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg"
              >
                Enroll & Commit to MySQL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
