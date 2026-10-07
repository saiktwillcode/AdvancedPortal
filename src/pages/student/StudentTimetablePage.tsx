import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  Filter,
  CheckCircle,
  X,
  BookOpen,
  Layers
} from 'lucide-react';
import { api } from '../../services/api';
import { TimetableSlot } from '../../types';

export const StudentTimetablePage: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('MONDAY');
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState<{
    day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
    startTime: string;
    endTime: string;
    subjectCode: string;
    subjectName: string;
    facultyName: string;
    roomNumber: string;
    building: string;
    type: 'LECTURE' | 'LAB' | 'TUTORIAL';
  }>({
    day: 'MONDAY',
    startTime: '16:00',
    endTime: '17:30',
    subjectCode: 'CS499',
    subjectName: 'Personal Study / Lab Session',
    facultyName: 'Self-Directed / Mentor Lab',
    roomNumber: 'Library Hall 2',
    building: 'Central University Library',
    type: 'TUTORIAL',
  });

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  useEffect(() => {
    api.getTimetable().then(data => {
      setTimetable(data);
    });
  }, []);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.addTimetableSlot(newSlot);
    if (res.success) {
      setTimetable(prev => [...prev, res.slot]);
      setShowAddModal(false);
    }
  };

  const filteredSlots = timetable
    .filter(slot => slot.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            INTERACTIVE COURSE SCHEDULER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Weekly Class & Lab Timetable
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live synchronized schedule with real-time room navigation and clash protection.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study / Lab Block</span>
        </button>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 ${
              selectedDay === day
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/70 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSlots.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-400 rounded-3xl bg-slate-900/40 border border-white/5">
            <CalendarIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold">No scheduled sessions for {selectedDay}.</p>
            <p className="text-xs text-slate-500 mt-1">Enjoy your study break or add a custom revision slot.</p>
          </div>
        ) : (
          filteredSlots.map(slot => {
            const isLab = slot.type === 'LAB';
            const isLecture = slot.type === 'LECTURE';

            return (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-cyan-300 font-bold flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isLab
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : isLecture
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {slot.type}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                    {slot.subjectCode}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                    {slot.subjectName}
                  </h4>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.facultyName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span className="truncate">{slot.roomNumber} • {slot.building}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Class Details Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedSlot(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400">{selectedSlot.subjectCode}</span>
                <h3 className="text-lg font-bold text-white leading-tight">{selectedSlot.subjectName}</h3>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-slate-950/60 p-4 border border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Session Type:</span>
                <span className="font-bold text-cyan-300">{selectedSlot.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Window:</span>
                <span className="font-mono text-white">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Faculty Instructor:</span>
                <span className="font-semibold text-white">{selectedSlot.facultyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-medium">{selectedSlot.roomNumber} ({selectedSlot.building})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RFID Attendance:</span>
                <span className="text-emerald-400 font-bold">Auto-Logged at Door</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSlot(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add Study / Lab Block</h3>
            <p className="text-xs text-slate-400 mb-4">Create a custom timetable slot for your personalized academic workflow.</p>

            <form onSubmit={handleAddSlot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Day of Week</label>
                <select
                  value={newSlot.day}
                  onChange={e => setNewSlot({ ...newSlot, day: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={newSlot.subjectName}
                  onChange={e => setNewSlot({ ...newSlot, subjectName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20"
              >
                Save Schedule Block
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
