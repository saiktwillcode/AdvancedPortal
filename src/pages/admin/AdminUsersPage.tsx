import React, { useState } from 'react';
import {
  Shield,
  User,
  CheckCircle,
  Lock,
  Key,
  Search,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';

export const AdminUsersPage: React.FC = () => {
  const [usersList, setUsersList] = useState([
    { id: 'usr_student_1', name: 'Saikat Khanra', email: 'saikat.cse26@university.edu', role: 'STUDENT' as UserRole, status: 'ACTIVE', lastLogin: '10 mins ago' },
    { id: 'usr_faculty_1', name: 'Prof. Elena Rostova', email: 'elena.rostova@university.edu', role: 'FACULTY' as UserRole, status: 'ACTIVE', lastLogin: '25 mins ago' },
    { id: 'usr_admin_1', name: 'Dean Marcus Vance', email: 'admin.vance@university.edu', role: 'ADMIN' as UserRole, status: 'ACTIVE', lastLogin: 'Just now' },
    { id: 'usr_student_2', name: 'Aarav Patel', email: 'aarav.cse26@university.edu', role: 'STUDENT' as UserRole, status: 'ACTIVE', lastLogin: '2 hours ago' },
    { id: 'usr_faculty_2', name: 'Dr. Alan Turing', email: 'alan.turing@university.edu', role: 'FACULTY' as UserRole, status: 'ACTIVE', lastLogin: 'Yesterday' },
  ]);

  const toggleStatus = (id: string) => {
    setUsersList(prev =>
      prev.map(u => (u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u))
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            RBAC ACCESS CONTROL & TOKENS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            User Roles & Authentication Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage JWT session tokens, role boundaries, and credential revocation.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
            <tr>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Role Tier</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Activity</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {usersList.map(u => {
              const isActive = u.status === 'ACTIVE';
              return (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{u.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{u.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'ADMIN'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : u.role === 'FACULTY'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">{u.lastLogin}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      }`}
                    >
                      {isActive ? 'Revoke Access' : 'Activate'}
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
