import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  CheckCircle,
  Clock,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Assignment } from '../../types';

export const FacultyAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAsg, setNewAsg] = useState({
    title: '',
    subjectCode: 'CS402',
    subjectName: 'Database Management Systems',
    description: '',
    dueDate: '',
    priority: 'HIGH' as const,
    estimatedHours: 3,
  });

  useEffect(() => {
    api.getAssignments().then(data => setAssignments(data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.createAssignment(newAsg);
    if (res.success) {
      setAssignments(prev => [res.assignment, ...prev]);
      setShowCreateModal(false);
      setNewAsg({
        title: '',
        subjectCode: 'CS402',
        subjectName: 'Database Management Systems',
        description: '',
        dueDate: '',
        priority: 'HIGH',
        estimatedHours: 3,
      });
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            COURSE DELIVERABLES & LAB PROJECTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Assignment Evaluation Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch coursework, specify priority weightings, and grade submissions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map(asg => (
          <div
            key={asg.id}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                  {asg.subjectCode}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                  {asg.priority} PRIORITY
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{asg.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{asg.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Due: <b className="text-white">{new Date(asg.dueDate).toLocaleDateString()}</b></span>
              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold text-[11px]">
                {asg.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Create Course Assignment</h3>
            <p className="text-xs text-slate-400 mb-4">Dispatched instantly to all enrolled students with Smart Deadline calculation.</p>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={newAsg.title}
                  onChange={e => setNewAsg({ ...newAsg, title: e.target.value })}
                  placeholder="e.g. Distributed Database Sharding Lab"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Course Subject</label>
                <select
                  value={newAsg.subjectCode}
                  onChange={e => setNewAsg({ ...newAsg, subjectCode: e.target.value, subjectName: e.target.value === 'CS402' ? 'Database Management Systems' : 'Operating Systems' })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  <option value="CS402">CS402 — Database Management Systems</option>
                  <option value="CS403">CS403 — Operating Systems</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description & Requirements</label>
                <textarea
                  rows={3}
                  required
                  value={newAsg.description}
                  onChange={e => setNewAsg({ ...newAsg, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newAsg.dueDate}
                    onChange={e => setNewAsg({ ...newAsg, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Priority Weight</label>
                  <select
                    value={newAsg.priority}
                    onChange={e => setNewAsg({ ...newAsg, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20"
              >
                Publish Deliverable
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
