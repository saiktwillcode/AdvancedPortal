import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Calendar,
  FileText,
  Check
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACADEMIC' | 'URGENT'>('ALL');
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'DBMS Assignment Due Tomorrow',
      desc: 'Relational Schema Normalization (3NF & BCNF) deadline is tomorrow at 23:59 IST.',
      category: 'ASSIGNMENT',
      type: 'URGENT',
      time: '15m ago',
      read: false,
      path: '/student/assignments',
    },
    {
      id: 'notif_2',
      title: 'Attendance Advisory in Operating Systems',
      desc: 'Current standing is 81.2%. Attend the upcoming 3 lectures to stay above safe threshold.',
      category: 'ATTENDANCE',
      type: 'URGENT',
      time: '1h ago',
      read: false,
      path: '/student/attendance',
    },
    {
      id: 'notif_3',
      title: 'Midterm Examination Hall Ticket Released',
      desc: 'Seat B-34 allocated in Auditorium Hall B for Operating Systems on Oct 12.',
      category: 'EXAMINATION',
      type: 'ACADEMIC',
      time: '3h ago',
      read: false,
      path: '/student/exams',
    },
    {
      id: 'notif_4',
      title: 'Tuition Fee Semester 4 Notice',
      desc: 'Remaining balance ₹30,000 due by October 31, 2026. Zero late penalty until due date.',
      category: 'FEES',
      type: 'ACADEMIC',
      time: '1d ago',
      read: true,
      path: '/student/fees',
    },
    {
      id: 'notif_5',
      title: 'Library Book Due Date Approaching',
      desc: '"Introduction to Algorithms (CLRS)" is due for renewal or return by Oct 10.',
      category: 'LIBRARY',
      type: 'ACADEMIC',
      time: '2d ago',
      read: true,
      path: '/student/library',
    },
  ]);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = filter === 'ALL'
    ? notifications
    : filter === 'URGENT'
    ? notifications.filter(n => n.type === 'URGENT')
    : notifications.filter(n => n.type === 'ACADEMIC');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Campus Notifications</h3>
              <p className="text-[11px] text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread announcements` : 'All caught up!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs & Mark All Action */}
        <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex space-x-1">
            {(['ALL', 'URGENT', 'ACADEMIC'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                onNavigate(notif.path);
                onClose();
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                notif.read
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  : 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-cyan-500/30 shadow-md shadow-cyan-950/20 hover:border-cyan-400/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                  notif.type === 'URGENT'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {notif.category}
                </span>
                <span className="text-slate-500 font-mono">{notif.time}</span>
              </div>

              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {notif.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {notif.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 text-center">
          <button
            onClick={() => {
              onNavigate('/student/notices');
              onClose();
            }}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            View All Institutional Notices →
          </button>
        </div>
      </div>
    </div>
  );
};
