import React, { useState, useEffect } from 'react';
import {
  Building2,
  Zap,
  Activity,
  Users,
  ShieldCheck,
  RefreshCw,
  Compass,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { FacilityStatus } from '../../types';
import { CommandCenter3D } from '../../components/3d/CommandCenter3D';

export const AdminCommandCenterPage: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityStatus[]>([]);
  const [activeFacility, setActiveFacility] = useState<FacilityStatus | null>(null);

  useEffect(() => {
    api.getFacilities().then(data => {
      setFacilities(data);
      if (data.length > 0) setActiveFacility(data[0]);
    });
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            CAMPUS INFRASTRUCTURE DIGITAL TWIN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Campus Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Spatial 3D sensor telemetry across all university buildings, laboratories, and halls.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-cyan-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-Time Sensor Bus Active</span>
        </div>
      </div>

      {/* Main 3D University Digital Twin Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span>Click any 3D facility node to inspect environmental telemetry, occupancy, and seats:</span>
          <span className="font-mono text-amber-400">Interactive WebGL 3D Model</span>
        </div>
        <CommandCenter3D
          facilities={facilities}
          onSelectBuilding={fac => setActiveFacility(fac)}
        />
      </div>

      {/* Summary KPI Cards Below 3D View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-lg">
          <span className="text-xs text-slate-400">Campus Total Present</span>
          <p className="text-2xl font-black text-white mt-1 font-mono">1,473</p>
          <span className="text-[10px] text-emerald-400">Across 6 Monitored Hubs</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-lg">
          <span className="text-xs text-slate-400">Total Open Study Seats</span>
          <p className="text-2xl font-black text-cyan-300 mt-1 font-mono">697</p>
          <span className="text-[10px] text-cyan-400">Library & Academic Labs</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-lg">
          <span className="text-xs text-slate-400">Campus Power Grid</span>
          <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">420 kW</p>
          <span className="text-[10px] text-slate-400">Solar Array: 48% Contribution</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-lg">
          <span className="text-xs text-slate-400">Infrastructure Health</span>
          <p className="text-2xl font-black text-amber-300 mt-1 font-mono">100% Online</p>
          <span className="text-[10px] text-slate-400">Zero Critical Faults</span>
        </div>
      </div>
    </div>
  );
};
