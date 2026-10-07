import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  User,
  Shield,
  Layers,
  Sparkles,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onNavigate: (path: string) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onNavigate,
  unreadCount = 3,
}) => {
  const { user, role, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    STUDENT: { label: 'Student Portal', badge: 'STUDENT', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' },
    FACULTY: { label: 'Faculty Suite', badge: 'FACULTY', color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40' },
    ADMIN: { label: 'Admin Command', badge: 'ADMIN', color: 'border-amber-500/40 text-amber-300 bg-amber-950/40' },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base md:text-lg tracking-wider text-white">
                STUDENT<span className="text-cyan-400"> PORTAL</span>
              </span>
              <span className={`hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${roleLabels[role].color}`}>
                {roleLabels[role].badge}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block tracking-wide">
              One Campus. One Platform. Everything Connected.
            </p>
          </div>
        </div>

        {/* Center / Right Control Panel */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 text-xs text-slate-300 hover:text-white transition-all shadow-sm group"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search portal...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Messages Quick Nav */}
          {user && (
            <button
              onClick={() => onNavigate(role === 'STUDENT' ? '/student/messages' : role === 'FACULTY' ? '/faculty/messages' : '/student/messages')}
              title="Campus Messaging"
              className="relative p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800/70 border border-transparent hover:border-cyan-500/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            </button>
          )}

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            title="Campus Notifications"
            className="relative p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800/70 border border-transparent hover:border-cyan-500/30 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-slate-800/70 border border-transparent hover:border-amber-500/30 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Role Switcher & User Profile Pill */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 transition-all"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover border border-cyan-400/40"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-semibold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-cyan-300 font-mono leading-tight">{user.studentId || user.employeeId || role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Fast Role-Switching Dropdown */}
              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-white/15 p-2 shadow-2xl z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Role (Demo Mode)
                    </p>
                    <p className="text-xs text-white font-medium mt-0.5">{user.name}</p>
                  </div>

                  <div className="py-1 space-y-1">
                    <button
                      onClick={() => {
                        switchRole('STUDENT');
                        setShowRoleDropdown(false);
                        onNavigate('/student');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        role === 'STUDENT' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-cyan-400" />
                        <span>Student View</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60">Saikat</span>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('FACULTY');
                        setShowRoleDropdown(false);
                        onNavigate('/faculty');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        role === 'FACULTY' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span>Faculty View</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60">Prof. Elena</span>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('ADMIN');
                        setShowRoleDropdown(false);
                        onNavigate('/admin');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-amber-400" />
                        <span>Admin View</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60">Dean Vance</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/10 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowRoleDropdown(false);
                        onNavigate('/login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('/login')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
