import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  User,
  Clock,
  Download,
  CheckCircle,
  FileText,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { Course } from '../../types';

export const StudentCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    api.getCourses().then(data => {
      setCourses(data);
      if (data.length > 0) setSelectedCourse(data[0]);
    });
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            ACADEMIC CURRICULUM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Enrolled Courses & Syllabus
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access lecture notes, downloadable slide decks, and module progress.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>4 Core Modules • 16 Active Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Course Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {courses.map(course => {
            const isSelected = selectedCourse?.id === course.id;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 ${
                  isSelected
                    ? 'border-cyan-400/80 bg-gradient-to-r from-blue-950/40 to-slate-900 shadow-cyan-500/15'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950 text-cyan-400 border border-white/10">
                    {course.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {course.credits} Credits
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{course.name}</h3>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.facultyName}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Details (7 Cols) */}
        {selectedCourse && (
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  CURRICULUM SPECIFICATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedCourse.name}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Instructor: <b className="text-white">{selectedCourse.facultyName}</b> ({selectedCourse.facultyEmail})
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {selectedCourse.schedule}
              </span>
            </div>

            {/* Syllabus Modules Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Core Module Units</span>
              </h4>

              <div className="space-y-2">
                {selectedCourse.syllabus.map((unit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-start space-x-3 text-xs"
                  >
                    <span className="w-5 h-5 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 leading-relaxed">{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Downloadable Resources */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Course Lecture Slides & Code Packages</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse.resources.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => alert(`Downloading authenticated course asset: ${res.name}`)}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-semibold text-white truncate group-hover:text-cyan-300">
                          {res.name}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {res.type} • {res.size}
                        </span>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
