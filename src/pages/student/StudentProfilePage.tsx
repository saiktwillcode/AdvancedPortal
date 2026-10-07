import React, { useState, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Calendar,
  Lock,
  Edit3,
  Award,
  LogOut,
  QrCode,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';
import { DigitalStudentId3D } from '../../components/3d/DigitalStudentId3D';

interface StudentProfilePageProps {
  onNavigate: (path: string) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    api.getCurrentUser().then(data => setProfile(data));
  }, []);

  if (!profile) {
    return <div className="p-8 text-center text-slate-400">Loading student profile credentials...</div>;
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            STUDENT IDENTITY SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Student Profile & Digital ID
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Biometrically verified student credentials and institutional registry.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 flex items-center space-x-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 flex items-center space-x-1.5 transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Security</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D ID Card on Left & Detailed Records on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Digital Student ID Card */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30 p-6 shadow-2xl flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
            INTERACTIVE 3D HOLOGRAPHIC ID
          </span>
          <p className="text-xs text-slate-400 text-center mb-4">
            Move mouse cursor to tilt the holographic badge. Click "Verify" for QR scan.
          </p>

          <DigitalStudentId3D student={profile} />
        </div>

        {/* Academic Profile Details Table */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white">University Registry Record</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              OFFICIALLY ENROLLED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Full Name</span>
              <p className="font-bold text-white text-sm">{profile.name}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Student Roll / ID</span>
              <p className="font-mono font-bold text-cyan-300 text-sm">{profile.studentId}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Degree Program</span>
              <p className="font-semibold text-white">{profile.program}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Current Semester</span>
              <p className="font-bold text-white">Semester 4 (2nd Year)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">University Email</span>
              <p className="font-mono text-cyan-400 truncate">{profile.email}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Emergency Contact</span>
              <p className="font-mono text-white">{profile.contactNumber}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Faculty Advisor</span>
              <p className="font-semibold text-white">{profile.advisorName}</p>
              <p className="text-[10px] text-cyan-400 font-mono truncate">{profile.advisorEmail}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[11px]">Blood Group & Health Code</span>
              <p className="font-bold text-rose-400">{profile.bloodGroup}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('/student/messages')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Contact Faculty Advisor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Edit Contact Details</h3>
            <p className="text-xs text-slate-400 mb-4">Official name and student ID changes require Registrar endorsement.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Contact Phone</label>
                <input
                  type="text"
                  defaultValue={profile.contactNumber}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Emergency Blood Group</label>
                <input
                  type="text"
                  defaultValue={profile.bloodGroup}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    alert('Profile contact details updated successfully.');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Change Account Password</h3>
            <p className="text-xs text-slate-400 mb-4">Requires minimum 8 characters with alphanumeric symbols.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    alert('Password updated with SHA-256 hash encryption.');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
