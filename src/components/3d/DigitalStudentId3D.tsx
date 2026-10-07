import React, { useState, useRef } from 'react';
import { QrCode, ShieldCheck, Sparkles, X, CheckCircle, ExternalLink, Award } from 'lucide-react';
import { StudentProfile } from '../../types';

interface DigitalStudentId3DProps {
  student: StudentProfile;
  className?: string;
}

export const DigitalStudentId3D: React.FC<DigitalStudentId3DProps> = ({ student, className = '' }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt 15 degrees
    const rY = ((x - centerX) / centerX) * 14;
    const rX = -((y - centerY) / centerY) * 14;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <>
      <div
        className={`perspective-1000 flex justify-center items-center py-4 ${className}`}
        style={{ perspective: '1200px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full max-w-[420px] h-[260px] md:h-[280px] rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-cyan-400/30 shadow-[0_20px_50px_rgba(30,58,138,0.35)] overflow-hidden cursor-pointer select-none group"
        >
          {/* Hologram Foil Sheen Overlay */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none group-hover:opacity-75 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(56, 189, 248, 0.45), rgba(168, 85, 247, 0.25) 40%, transparent 70%)`,
            }}
          />

          {/* Micro Geometric Watermark */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full border border-indigo-500/15 pointer-events-none" />

          {/* Top Brand & Chip Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wider text-cyan-300 uppercase">
                  National University
                </h4>
                <p className="text-[10px] text-slate-400 tracking-widest font-mono">
                  SMART DIGITAL CAMPUS ID
                </p>
              </div>
            </div>

            {/* Smart EMV Gold Chip & Verified Pill */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-600 border border-yellow-200/50 shadow-inner flex flex-col justify-center px-1 space-y-0.5">
                <div className="h-0.5 bg-yellow-900/40 rounded-full" />
                <div className="h-0.5 bg-yellow-900/40 rounded-full" />
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </span>
            </div>
          </div>

          {/* Middle Body Info */}
          <div className="relative z-10 mt-5 flex items-center space-x-4">
            {/* Avatar Photo Frame */}
            <div className="relative w-20 h-20 md:w-22 md:h-22 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-lg shrink-0">
              <img
                src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={student.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>

            {/* Student Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">
                {student.name}
              </h3>
              <p className="text-xs font-mono font-semibold text-cyan-300">
                ID: {student.studentId || 'CSE2026042'}
              </p>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                {student.department}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-[10px] text-slate-400">
                <span>Sem: <b className="text-white font-mono">{student.semester}</b></span>
                <span>Blood: <b className="text-rose-400 font-mono">{student.bloodGroup}</b></span>
                <span>CGPA: <b className="text-emerald-400 font-mono">{student.cgpa}</b></span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Barcode, QR Code & Tap to Verify */}
          <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-0.5 h-4 opacity-70">
                {/* Stylized Barcode */}
                {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 1, 3].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}px` }}
                    className="h-full bg-cyan-200 inline-block"
                  />
                ))}
              </div>
              <span className="text-[8px] font-mono text-slate-400 mt-1">
                VALID THRU: 2028 • TOKEN #8841-SEC-V4
              </span>
            </div>

            {/* QR Code Button */}
            <button
              onClick={() => setShowVerifyModal(true)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center space-x-1.5 text-xs text-cyan-300 font-semibold"
            >
              <QrCode className="w-4 h-4 text-cyan-300" />
              <span className="text-[10px]">Verify</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR & Identity Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Cryptographic Verification</h3>
              <p className="text-xs text-slate-400 mt-1">
                Scan this QR code with campus scanner or gate turnstile to verify identity.
              </p>

              {/* Dynamic Simulated High-Contrast QR Code */}
              <div className="my-5 p-4 rounded-2xl bg-white inline-block shadow-lg mx-auto">
                <div className="w-40 h-40 bg-slate-950 p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-36 h-36 text-white" />
                </div>
              </div>

              <div className="rounded-xl bg-slate-800/60 p-3 text-left border border-slate-700/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student:</span>
                  <span className="font-semibold text-white">{student.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ID:</span>
                  <span className="font-mono text-cyan-300">{student.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security Hash:</span>
                  <span className="font-mono text-[10px] text-slate-300">sha256-8a7f92b...</span>
                </div>
              </div>

              <button
                onClick={() => setShowVerifyModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
