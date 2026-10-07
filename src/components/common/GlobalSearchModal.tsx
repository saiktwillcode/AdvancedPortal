import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  User,
  FileText,
  Calendar,
  Library,
  MapPin,
  X,
  ArrowRight
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle open handled in parent or trigger
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search items database
  const searchIndex = [
    { title: 'Database Management Systems (CS402)', category: 'Courses', path: '/student/courses', icon: BookOpen },
    { title: 'Data Structures & Algorithms (CS401)', category: 'Courses', path: '/student/courses', icon: BookOpen },
    { title: 'Operating Systems (CS403)', category: 'Courses', path: '/student/courses', icon: BookOpen },
    { title: 'Prof. Elena Rostova (DBMS Faculty)', category: 'Faculty', path: '/student/messages', icon: User },
    { title: 'Dr. Alan Turing (Algorithms Faculty)', category: 'Faculty', path: '/student/messages', icon: User },
    { title: 'Relational Schema Normalization (3NF/BCNF)', category: 'Assignments', path: '/student/assignments', icon: FileText },
    { title: 'Operating Systems Midterm Exam (Oct 12)', category: 'Exams', path: '/student/exams', icon: Calendar },
    { title: 'Campus Innovation Hackathon 2026', category: 'Notices', path: '/student/notices', icon: FileText },
    { title: 'Introduction to Algorithms (CLRS)', category: 'Library', path: '/student/library', icon: Library },
    { title: 'Central University Library (342 Inside)', category: 'Campus', path: '/student/campus', icon: MapPin },
    { title: 'Campus Command Center (3D Twin)', category: 'Admin', path: '/admin/command', icon: MapPin },
    { title: 'Ask Campus AI Assistant', category: 'AI', path: '/student/ai', icon: BookOpen },
    { title: 'Digital Student ID Card', category: 'Profile', path: '/student/profile', icon: User },
    { title: 'Live Grade Tracking & CGPA Simulator', category: 'Marks', path: '/student/marks', icon: FileText },
  ];

  const filtered = query.trim()
    ? searchIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex.slice(0, 7);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl overflow-hidden animate-scale-up">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses, professors, assignments, exams, library..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-800 text-[11px] text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-400">
              No matching campus records found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate(item.path);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate group-hover:text-cyan-300">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with click or arrow keys</span>
          <span className="font-mono">Ctrl+K to reopen anytime</span>
        </div>
      </div>
    </div>
  );
};
