import React from 'react';
import {
  LayoutDashboard,
  User,
  CheckSquare,
  Award,
  BookOpen,
  Calendar,
  FileText,
  CreditCard,
  Library,
  Trophy,
  BarChart3,
  Bot,
  MapPin,
  MessageSquare,
  Users,
  Building,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderGit2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isSpecial?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) => {
  const { role, logout } = useAuth();

  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'My Profile & ID', path: '/student/profile', icon: User },
    { label: 'Attendance', path: '/student/attendance', icon: CheckSquare, badge: '87%' },
    { label: 'Marks & Grades', path: '/student/marks', icon: Award, badge: '9.94' },
    { label: 'Assignments', path: '/student/assignments', icon: FileText, badge: '4 Due' },
    { label: 'Timetable', path: '/student/timetable', icon: Calendar },
    { label: 'My Courses', path: '/student/courses', icon: BookOpen },
    { label: 'Examination', path: '/student/exams', icon: ShieldCheck },
    { label: 'Fee Center', path: '/student/fees', icon: CreditCard },
    { label: 'Digital Library', path: '/student/library', icon: Library },
    { label: 'Achievements', path: '/student/achievements', icon: Trophy },
    { label: 'Academic Analytics', path: '/student/analytics', icon: BarChart3 },
    { label: 'Campus AI', path: '/student/ai', icon: Bot, isSpecial: true },
    { label: 'Innovation & Projects', path: '/student/innovation', icon: FolderGit2, badge: 'New', isSpecial: true },
    { label: 'Campus Map & Hubs', path: '/student/campus', icon: MapPin },
    { label: 'Faculty Messages', path: '/student/messages', icon: MessageSquare, badge: '1 New' },
    { label: 'Campus Notices', path: '/student/notices', icon: FileText },
  ];

  const facultyNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
    { label: 'Student Roster', path: '/faculty/students', icon: Users },
    { label: 'Attendance Entry', path: '/faculty/attendance', icon: CheckSquare },
    { label: 'Marks Management', path: '/faculty/marks', icon: Award },
    { label: 'Assignment Hub', path: '/faculty/assignments', icon: FileText },
    { label: 'Course Catalog', path: '/faculty/courses', icon: BookOpen },
    { label: 'Notice Broadcast', path: '/faculty/notices', icon: FileText },
    { label: 'Faculty Analytics', path: '/faculty/analytics', icon: BarChart3 },
    { label: 'Student Messages', path: '/faculty/messages', icon: MessageSquare },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Institution Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Campus Command (3D)', path: '/admin/command', icon: Building, isSpecial: true },
    { label: 'Student Management', path: '/admin/students', icon: Users },
    { label: 'Faculty Management', path: '/admin/faculty', icon: Users },
    { label: 'Course Management', path: '/admin/courses', icon: BookOpen },
    { label: 'Campus Notices', path: '/admin/notices', icon: FileText },
    { label: 'User Roles & Access', path: '/admin/users', icon: User },
    { label: 'University Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const items = role === 'STUDENT' ? studentNavItems : role === 'FACULTY' ? facultyNavItems : adminNavItems;

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-slate-950/70 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Role Title in Sidebar */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            {role} NAVIGATION
          </span>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-xl px-3 py-2 text-xs font-medium transition-all group relative ${
                isActive
                  ? item.isSpecial
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive
                    ? item.isSpecial
                      ? 'text-cyan-400'
                      : 'text-blue-400'
                    : item.isSpecial
                    ? 'text-cyan-400'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <span className="ml-3 truncate tracking-tight text-left flex-1">
                  {item.label}
                </span>
              )}

              {!collapsed && item.badge && (
                <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}

              {/* Active Pip Indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Controls */}
      <div className="p-2 border-t border-white/10 space-y-1">
        {collapsed ? (
          <button
            onClick={onToggleCollapse}
            title="Expand Sidebar"
            className="w-full flex justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-400">
            <span className="text-[10px] font-mono">PORTAL V2.4</span>
            <button
              onClick={() => logout()}
              className="flex items-center space-x-1 text-[11px] text-rose-400 hover:text-rose-300"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
