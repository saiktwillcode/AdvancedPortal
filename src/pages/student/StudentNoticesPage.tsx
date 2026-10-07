import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  CheckCircle,
  Bell,
  Clock,
  Filter,
  Check,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Notice } from '../../types';

export const StudentNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    api.getNotices().then(data => setNotices(data));
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await api.markNoticeAsRead(id);
    setNotices(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const categories = ['ALL', 'ACADEMIC', 'EXAMINATION', 'EVENTS', 'PLACEMENT'];

  const filtered = notices.filter(n => {
    const matchCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            OFFICIAL INSTITUTIONAL BROADCASTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Campus Notice Board
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified circulars from University Dean, Registrar, and Placement Cell.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search circulars, keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/70 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filtered.map(notice => {
          const isHigh = notice.priority === 'HIGH';
          return (
            <div
              key={notice.id}
              className={`p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 shadow-xl ${
                !notice.read
                  ? 'border-cyan-500/40 bg-gradient-to-r from-blue-950/30 to-slate-900'
                  : 'border-white/10 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {notice.date} • {notice.author}
                  </span>
                </div>

                {!notice.read ? (
                  <button
                    onClick={() => handleMarkAsRead(notice.id)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center space-x-1 self-start sm:self-auto"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark as Read</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">Read</span>
                )}
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">{notice.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{notice.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
