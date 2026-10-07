import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Zap,
  Star,
  CheckCircle,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { Achievement } from '../../types';

export const StudentAchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  useEffect(() => {
    api.getAchievements().then(data => setAchievements(data));
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#ec4899'],
    });
  };

  const handleClaimReward = () => {
    triggerConfetti();
    alert('🎉 500 XP Points credited to your Campus Academic Ledger! Leaderboard rank updated.');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            GAMIFIED MERIT REGISTRY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Student Achievement & Badges Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Earn verified institutional badges, hackathon honors, and leadership citations.
          </p>
        </div>

        <button
          onClick={handleClaimReward}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Gift className="w-4 h-4 text-slate-950" />
          <span>Claim Milestone Reward</span>
        </button>
      </div>

      {/* Gamified Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-cyan-500/30 shadow-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Honor Tier</span>
            <h3 className="text-2xl font-black text-white">Platinum Scholar</h3>
            <p className="text-[10px] text-cyan-400 font-mono">1,400 Total XP Points</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
            ⭐
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">University Rank</span>
            <h3 className="text-2xl font-black text-amber-300 font-mono">#1 Department</h3>
            <p className="text-[10px] text-slate-400">Computer Science & Engineering</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl">
            🎯
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Unlocked Badges</span>
            <h3 className="text-2xl font-black text-emerald-400 font-mono">4 of 6 Badges</h3>
            <p className="text-[10px] text-slate-400">Next unlock: 100 Class Milestone</p>
          </div>
        </div>
      </div>

      {/* Badges Grid with 3D Flip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map(ach => {
          const isFlipped = flippedId === ach.id;
          return (
            <div
              key={ach.id}
              onClick={() => {
                setFlippedId(isFlipped ? null : ach.id);
                triggerConfetti();
              }}
              style={{ perspective: '1000px' }}
              className="h-72 cursor-pointer group select-none"
            >
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full h-full relative"
              >
                {/* Front of Card */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 group-hover:border-cyan-400 shadow-xl flex flex-col items-center justify-between text-center"
                >
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                    {ach.badgeLevel} TIER
                  </span>

                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                    {ach.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{ach.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ach.description}</p>
                  </div>

                  <span className="text-[10px] text-cyan-400 font-semibold group-hover:underline">
                    Tap to flip card ↺
                  </span>
                </div>

                {/* Back of Card */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 p-6 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-cyan-400 shadow-2xl flex flex-col justify-between text-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase block font-bold">
                      VERIFIED MERIT CITATION
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{ach.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Awarded Date:</span>
                      <span className="font-mono text-white">{ach.unlockedAt}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Merit Points:</span>
                      <span className="font-mono font-bold text-emerald-400">+{ach.xpPoints} XP</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-cyan-300 text-center font-semibold">
                    Tap to flip back ↺
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
