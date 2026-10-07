import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Send,
  CheckCircle,
  Bell,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Notice } from '../../types';

export const FacultyNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'ACADEMIC' | 'EXAMINATION' | 'EVENTS'>('ACADEMIC');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  useEffect(() => {
    api.getNotices().then(data => setNotices(data));
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const res = await api.createNotice({
      title,
      content,
      category,
      priority,
      author: 'Prof. Elena Rostova',
    });

    if (res.success) {
      setNotices(prev => [res.notice, ...prev]);
      setTitle('');
      setContent('');
      setPublishedSuccess(true);
      setTimeout(() => setPublishedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
            CAMPUS DISPATCH & BROADCAST
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Faculty Notice Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish academic circulars, lab advisories, and exam reminders to student portals.
          </p>
        </div>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Notice published live to student notification center!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Publish Notice Form (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Broadcast New Circular</span>
          </h3>

          <form onSubmit={handlePublish} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. DBMS Assignment Deadline Reminder"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
                >
                  <option value="ACADEMIC">Academic</option>
                  <option value="EXAMINATION">Examination</option>
                  <option value="EVENTS">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
                >
                  <option value="HIGH">High (Urgent Banner)</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Detailed Circular Body</label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write official instructions for the students..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Circular</span>
            </button>
          </form>
        </div>

        {/* Existing Notices List (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-bold text-white mb-2">Live Broadcast Feed</h3>
          {notices.map(n => (
            <div
              key={n.id}
              className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {n.category}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">{n.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{n.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
