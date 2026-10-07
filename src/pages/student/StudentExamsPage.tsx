import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Exam } from '../../types';

export const StudentExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showHallTicket, setShowHallTicket] = useState(false);

  useEffect(() => {
    api.getExams().then(data => setExams(data));
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            EXAMINATION CONTROLLER PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Mid-Semester Examination Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Official seating allocations, hall ticket issuance, and invigilation protocols.
          </p>
        </div>

        <button
          onClick={() => setShowHallTicket(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center space-x-2"
        >
          <FileCheck className="w-4 h-4" />
          <span>View Verified Hall Ticket</span>
        </button>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {exams.map(exam => {
          const daysLeft = Math.max(
            0,
            Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          );

          return (
            <div
              key={exam.id}
              className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded-md border border-white/10">
                    {exam.subjectCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    {daysLeft > 0 ? `${daysLeft} DAYS REMAINING` : 'TODAY'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {exam.subjectName}
                </h3>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exam.time} ({exam.durationMinutes} mins)</span>
                  </div>
                </div>
              </div>

              {/* Seating Allocation Box */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs bg-slate-950/60 p-3 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">SEAT NUMBER</span>
                  <p className="text-base font-black text-white font-mono">{exam.seatNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">ROOM ALLOCATION</span>
                  <p className="text-xs font-semibold text-cyan-300">{exam.roomNumber}</p>
                  <p className="text-[10px] text-slate-500">{exam.building}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Examination Code of Conduct Notice */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Institutional Examination Regulations & Instructions</span>
        </h3>
        <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
          <li>Candidates must produce their 3D Digital Student ID Card or printed Hall Ticket at the door RFID turnstile.</li>
          <li>Entry into examination halls is strictly prohibited after 15 minutes of commencement.</li>
          <li>Electronic devices including smartwatches and programmable calculators are strictly banned.</li>
          <li>Minimum 75% attendance criterion must be fulfilled prior to final admittance.</li>
        </ul>
      </div>

      {/* Hall Ticket Modal */}
      {showHallTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                  OFFICIAL ADMISSION TICKET
                </span>
                <h3 className="text-lg font-black text-white">Fall 2026 Examination Hall Ticket</h3>
              </div>
              <button
                onClick={() => setShowHallTicket(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="my-5 grid grid-cols-2 gap-3 text-xs bg-slate-950/70 p-4 rounded-2xl border border-white/5">
              <div><span className="text-slate-500">Student:</span> <b className="text-white">Saikat Khanra</b></div>
              <div><span className="text-slate-500">Roll ID:</span> <b className="text-cyan-300 font-mono">CSE2026042</b></div>
              <div><span className="text-slate-500">Department:</span> <b className="text-white">CSE</b></div>
              <div><span className="text-slate-500">Attendance:</span> <b className="text-emerald-400">87% (Cleared)</b></div>
            </div>

            <table className="w-full text-left text-xs mb-6">
              <thead className="text-[10px] text-slate-400 uppercase border-b border-white/10">
                <tr>
                  <th className="py-2">Subject</th>
                  <th className="py-2">Date & Time</th>
                  <th className="py-2">Hall</th>
                  <th className="py-2 text-right">Seat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {exams.map(e => (
                  <tr key={e.id}>
                    <td className="py-2.5 font-bold text-white">{e.subjectCode}</td>
                    <td className="py-2.5 text-slate-300">{e.date} • {e.time}</td>
                    <td className="py-2.5 text-cyan-300">{e.roomNumber}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-white">{e.seatNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert('Hall ticket PDF generated with cryptographic verification watermark.');
                  setShowHallTicket(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Printable Hall Ticket</span>
              </button>
              <button
                onClick={() => setShowHallTicket(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
