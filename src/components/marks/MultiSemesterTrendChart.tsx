import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  Filter,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Layers,
  ArrowUpRight,
  Eye,
  RotateCcw,
  Sliders
} from 'lucide-react';

interface SemesterDataPoint {
  semester: string;
  shortSem: string;
  [key: string]: any;
}

// 4-Semester detailed subject performance data
const MULTI_SEMESTER_DATA: SemesterDataPoint[] = [
  {
    semester: 'Semester 1 (Fall 2024)',
    shortSem: 'Sem 1',
    CS401: 92, // DSA
    CS402: 88, // DBMS
    CS403: 84, // OS
    CS404: 90, // Networks
    MA401: 94, // Discrete Math
    SGPA: 9.82,
    CS401_gp: 9.5,
    CS402_gp: 9.0,
    CS403_gp: 8.8,
    CS404_gp: 9.2,
    MA401_gp: 9.8,
  },
  {
    semester: 'Semester 2 (Spring 2025)',
    shortSem: 'Sem 2',
    CS401: 95,
    CS402: 91,
    CS403: 87,
    CS404: 92,
    MA401: 96,
    SGPA: 9.90,
    CS401_gp: 9.8,
    CS402_gp: 9.3,
    CS403_gp: 9.0,
    CS404_gp: 9.4,
    MA401_gp: 10.0,
  },
  {
    semester: 'Semester 3 (Fall 2025)',
    shortSem: 'Sem 3',
    CS401: 96,
    CS402: 94,
    CS403: 89,
    CS404: 94,
    MA401: 97,
    SGPA: 9.96,
    CS401_gp: 10.0,
    CS402_gp: 9.7,
    CS403_gp: 9.2,
    CS404_gp: 9.6,
    MA401_gp: 10.0,
  },
  {
    semester: 'Semester 4 (Current 2026)',
    shortSem: 'Sem 4',
    CS401: 98,
    CS402: 95,
    CS403: 91,
    CS404: 96,
    MA401: 98,
    SGPA: 9.98,
    CS401_gp: 10.0,
    CS402_gp: 10.0,
    CS403_gp: 9.8,
    CS404_gp: 10.0,
    MA401_gp: 10.0,
  },
];

interface SubjectMeta {
  key: string;
  name: string;
  code: string;
  color: string;
  glowColor: string;
}

const SUBJECTS_CONFIG: SubjectMeta[] = [
  {
    key: 'CS401',
    name: 'Data Structures & Algorithms',
    code: 'CS401',
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    key: 'CS402',
    name: 'Database Management Systems',
    code: 'CS402',
    color: '#3b82f6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    key: 'CS403',
    name: 'Operating Systems & Arch',
    code: 'CS403',
    color: '#a855f7', // Violet
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    key: 'CS404',
    name: 'Computer Networks',
    code: 'CS404',
    color: '#f59e0b', // Amber
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    key: 'MA401',
    name: 'Discrete Mathematics',
    code: 'MA401',
    color: '#10b981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    key: 'SGPA',
    name: 'Overall Semester SGPA',
    code: 'SGPA',
    color: '#f43f5e', // Rose
    glowColor: 'rgba(244, 63, 94, 0.4)',
  },
];

// Custom Glassmorphic Tooltip
const CustomTooltip = ({ active, payload, label, mode }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 p-4 shadow-2xl text-xs space-y-2 max-w-xs z-50">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="font-bold text-white tracking-wide">{label}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
          Verified Transcript
        </span>
      </div>

      <div className="space-y-1.5 pt-1">
        {payload.map((entry: any, i: number) => {
          const isSgpa = entry.dataKey === 'SGPA';
          const displayVal = isSgpa
            ? `${Number(entry.value).toFixed(2)} SGPA`
            : mode === 'percentage'
            ? `${entry.value}%`
            : `${Number(entry.value).toFixed(1)} / 10.0`;

          return (
            <div key={i} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color, boxShadow: `0 0 6px ${entry.color}` }}
                />
                <span className="text-slate-300 text-[11px] font-medium truncate max-w-[140px]">
                  {entry.name}
                </span>
              </div>
              <span className="font-mono font-bold text-white text-[11px]">
                {displayVal}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MultiSemesterTrendChart: React.FC = () => {
  // Active subject keys set (all on by default)
  const [activeSubjects, setActiveSubjects] = useState<string[]>([
    'CS401',
    'CS402',
    'CS403',
    'CS404',
    'MA401',
    'SGPA',
  ]);

  // Metric mode: percentage score (0-100) vs grade point (0-10)
  const [metricMode, setMetricMode] = useState<'percentage' | 'gradePoint'>('percentage');

  // Isolated subject (null = multi-subject view)
  const [isolatedSubject, setIsolatedSubject] = useState<string | null>(null);

  // Toggle individual subject in/out of view
  const toggleSubject = (key: string) => {
    if (isolatedSubject) {
      setIsolatedSubject(null);
    }
    setActiveSubjects(prev => {
      if (prev.includes(key)) {
        // Keep at least one active
        if (prev.length === 1) return prev;
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // Isolate a single subject
  const isolateSubject = (key: string) => {
    if (isolatedSubject === key) {
      setIsolatedSubject(null);
      setActiveSubjects(SUBJECTS_CONFIG.map(s => s.key));
    } else {
      setIsolatedSubject(key);
      setActiveSubjects([key]);
    }
  };

  // Select all or reset
  const selectAll = () => {
    setIsolatedSubject(null);
    setActiveSubjects(SUBJECTS_CONFIG.map(s => s.key));
  };

  // Formatted chart data adapting to metric mode
  const chartData = useMemo(() => {
    return MULTI_SEMESTER_DATA.map(d => {
      const point: any = {
        semester: d.semester,
        shortSem: d.shortSem,
      };

      SUBJECTS_CONFIG.forEach(sub => {
        if (sub.key === 'SGPA') {
          // If in percentage mode, scale SGPA (e.g. 9.82 -> 98.2 for seamless comparison) or keep intact
          point[sub.key] = metricMode === 'percentage' ? d.SGPA * 10 : d.SGPA;
        } else {
          point[sub.key] = metricMode === 'percentage' ? d[sub.key] : d[`${sub.key}_gp`];
        }
      });

      return point;
    });
  }, [metricMode]);

  // Visible subjects configuration
  const visibleConfig = useMemo(() => {
    return SUBJECTS_CONFIG.filter(s => activeSubjects.includes(s.key));
  }, [activeSubjects]);

  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-2xl space-y-6">
      {/* Chart Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              MULTI-SEMESTER COMPARATIVE TIMELINE
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-1 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Interactive Subject Performance Trends (Semesters 1 - 4)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter individual subjects, toggle metrics, and analyze semester-over-semester grade velocity.
          </p>
        </div>

        {/* Metric Mode Switcher & Quick Controls */}
        <div className="flex items-center space-x-2">
          {/* Percentage vs Grade Point Toggle */}
          <div className="p-1 rounded-2xl bg-slate-950 border border-white/10 flex items-center space-x-1">
            <button
              onClick={() => setMetricMode('percentage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                metricMode === 'percentage'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Percentage (%)
            </button>
            <button
              onClick={() => setMetricMode('gradePoint')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                metricMode === 'gradePoint'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grade Points (0-10)
            </button>
          </div>

          {/* Reset / All Button */}
          <button
            onClick={selectAll}
            title="Reset All Subjects"
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Subject Filter Pills Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click pill to toggle line • Double-click or click [Solo] to isolate:</span>
          </span>
          <span className="font-mono text-[11px] text-cyan-300">
            {activeSubjects.length} of {SUBJECTS_CONFIG.length} Active
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {SUBJECTS_CONFIG.map(sub => {
            const isActive = activeSubjects.includes(sub.key);
            const isIsolated = isolatedSubject === sub.key;

            return (
              <div
                key={sub.key}
                className={`group flex items-center rounded-2xl border transition-all duration-200 select-none text-xs ${
                  isActive
                    ? 'bg-slate-950/90 text-white shadow-md'
                    : 'bg-slate-950/40 text-slate-500 border-white/5 opacity-60 hover:opacity-100'
                }`}
                style={{
                  borderColor: isActive ? sub.color : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? `0 0 14px ${sub.glowColor}` : 'none',
                }}
              >
                {/* Main Toggle Button */}
                <button
                  onClick={() => toggleSubject(sub.key)}
                  className="px-3 py-1.5 flex items-center space-x-2 hover:brightness-110"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: sub.color,
                      boxShadow: isActive ? `0 0 8px ${sub.color}` : 'none',
                    }}
                  />
                  <span className="font-bold">{sub.code}</span>
                  <span className="hidden sm:inline text-[11px] text-slate-300 font-medium">
                    {sub.name}
                  </span>
                </button>

                {/* Solo / Isolate Action */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    isolateSubject(sub.key);
                  }}
                  title={isIsolated ? 'Show all subjects' : `Isolate ${sub.code}`}
                  className={`px-2 py-1.5 border-l border-white/10 text-[10px] font-mono hover:text-white transition-colors ${
                    isIsolated ? 'text-cyan-300 bg-cyan-500/20 font-bold' : 'text-slate-400'
                  }`}
                >
                  {isIsolated ? 'All' : 'Solo'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Recharts Line Chart Container */}
      <div className="h-[360px] w-full pt-4 pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              {SUBJECTS_CONFIG.map(sub => (
                <linearGradient key={sub.key} id={`glow-${sub.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sub.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={sub.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.07)"
              vertical={false}
            />

            <XAxis
              dataKey="shortSem"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />

            <YAxis
              stroke="#64748b"
              domain={metricMode === 'percentage' ? [80, 100] : [8.0, 10.0]}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickFormatter={(v: number) => (metricMode === 'percentage' ? `${v}%` : v.toFixed(1))}
            />

            <Tooltip content={<CustomTooltip mode={metricMode} />} />

            {/* Target 90% Distinction Reference Line */}
            {metricMode === 'percentage' && (
              <ReferenceLine
                y={90}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: '90% Outstanding (Grade O)',
                  fill: '#10b981',
                  fontSize: 10,
                  position: 'insideBottomRight',
                }}
              />
            )}

            {/* Render lines for each active filtered subject */}
            {visibleConfig.map(sub => {
              const isSgpa = sub.key === 'SGPA';
              return (
                <Line
                  key={sub.key}
                  type="monotone"
                  dataKey={sub.key}
                  name={isSgpa ? 'SGPA Index' : `${sub.code} - ${sub.name}`}
                  stroke={sub.color}
                  strokeWidth={isSgpa ? 3.5 : 2.5}
                  strokeDasharray={isSgpa ? '5 5' : undefined}
                  dot={{
                    r: 4.5,
                    fill: sub.color,
                    stroke: '#0f172a',
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 7.5,
                    fill: '#ffffff',
                    stroke: sub.color,
                    strokeWidth: 3,
                  }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trajectory Insights & Analytics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">
            Fastest Velocity
          </span>
          <p className="text-sm font-bold text-white">CS401: Data Structures</p>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6.0% (92% → 98%)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">
            Peak Consistency
          </span>
          <p className="text-sm font-bold text-white">MA401: Discrete Math</p>
          <p className="text-xs text-slate-300">
            Maintained <b className="text-emerald-400">96%+</b> across all terms
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">
            Greatest Comeback
          </span>
          <p className="text-sm font-bold text-white">CS403: Operating Systems</p>
          <p className="text-xs text-slate-300">
            Improved from <b className="text-slate-400">84%</b> to <b className="text-amber-300">91%</b>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-rose-400 font-mono font-bold uppercase">
            Cumulative Standing
          </span>
          <p className="text-sm font-bold text-white">Top 0.5% in CSE</p>
          <p className="text-xs text-cyan-300 font-mono">Current SGPA: 9.98 (Sem 4)</p>
        </div>
      </div>
    </div>
  );
};
