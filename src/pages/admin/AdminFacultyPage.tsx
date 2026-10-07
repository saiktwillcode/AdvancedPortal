import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Mail,
  BookOpen,
  Award,
  CheckCircle,
  Building
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminFacultyPage: React.FC = () => {
  const [faculty, setFaculty] = useState([
    { id: 'usr_faculty_1', name: 'Prof. Elena Rostova', employeeId: 'FAC8812', email: 'elena.rostova@university.edu', department: 'Computer Science', courses: 'CS402 DBMS, CS403 OS', status: 'ACTIVE' },
    { id: 'usr_faculty_2', name: 'Dr. Alan Turing', employeeId: 'FAC8801', email: 'alan.turing@university.edu', department: 'Computer Science', courses: 'CS401 Data Structures', status: 'ACTIVE' },
    { id: 'usr_faculty_3', name: 'Dr. Srinivasa Rao', employeeId: 'FAC8845', email: 'srinivasa.rao@university.edu', department: 'Mathematics', courses: 'MA401 Discrete Math', status: 'ACTIVE' },
    { id: 'usr_faculty_4', name: 'Prof. Radia Perlman', employeeId: 'FAC8820', email: 'radia.perlman@university.edu', department: 'Computer Science', courses: 'CS404 Networks', status: 'ACTIVE' },
  ]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            ACADEMIC APPOINTMENTS & FACULTY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Faculty Directory & Allocation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Professors, teaching assistants, and research mentors across all faculties.
          </p>
        </div>

        <button
          onClick={() => alert('New faculty onboarding requisition created in Academic Senate ledger.')}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Appoint Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {faculty.map(f => (
          <div
            key={f.id}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                  {f.employeeId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {f.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{f.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{f.department}</p>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">{f.email}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 text-xs">
              <span className="text-slate-400">Assigned Courses:</span>
              <p className="font-semibold text-white mt-0.5">{f.courses}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
