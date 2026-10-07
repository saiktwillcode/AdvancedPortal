import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle,
  Award,
  Layers,
  Users
} from 'lucide-react';
import { api } from '../../services/api';
import { Course } from '../../types';

export const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api.getCourses().then(data => setCourses(data));
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            BOARD OF STUDIES & ACCREDITATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Course & Curriculum Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure module credit weightings, faculty instructors, and syllabus units.
          </p>
        </div>

        <button
          onClick={() => alert('New course proposal form initialized for Academic Board review.')}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map(course => (
          <div
            key={course.id}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                  {course.code}
                </span>
                <span className="text-xs font-mono text-slate-400">{course.credits} Credits</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{course.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{course.department} • Semester {course.semester}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Assigned Faculty: <b className="text-white">{course.facultyName}</b></span>
              <span className="text-cyan-400 font-mono font-bold">{course.enrolledStudentsCount} Enrolled</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
