import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  Key,
  Server,
  Save,
  CheckCircle
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [session, setSession] = useState('Fall 2026');
  const [minAttendance, setMinAttendance] = useState(75);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            ENTERPRISE PLATFORM CONFIGURATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            System & Security Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Institutional thresholds, academic calendar dates, and MySQL database connection parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save System Policies</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>University system policies and thresholds committed to production cluster.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Academic Session Policy</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Active Academic Term</label>
              <input
                type="text"
                value={session}
                onChange={e => setSession(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">
                Minimum Attendance Hall Ticket Threshold: <b className="text-cyan-400">{minAttendance}%</b>
              </label>
              <input
                type="range"
                min="65"
                max="85"
                value={minAttendance}
                onChange={e => setMinAttendance(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Database className="w-4 h-4 text-amber-400" />
            <span>Database & Spring Boot Node Health</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400">Database Engine:</span>
              <span className="font-mono text-white font-bold">MySQL 8.0.35 Enterprise</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400">REST API Framework:</span>
              <span className="font-mono text-emerald-400 font-bold">Spring Boot 3.3.x / Express</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400">AI Integration Engine:</span>
              <span className="font-mono text-cyan-300 font-bold">Google Gemini 3.8 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
