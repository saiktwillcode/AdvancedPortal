import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Building,
  Coffee,
  Users,
  Dumbbell,
  Wifi,
  Navigation,
  Compass,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { FacilityStatus } from '../../types';
import { CommandCenter3D } from '../../components/3d/CommandCenter3D';

export const StudentCampusPage: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityStatus[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<FacilityStatus | null>(null);

  useEffect(() => {
    api.getFacilities().then(data => {
      setFacilities(data);
      if (data.length > 0) setSelectedFacility(data[0]);
    });
  }, []);

  const campusServices = [
    { title: 'Central Dining & Cafeteria', status: 'Live Menu Active', metric: 'Wait Time: ~4 Mins', icon: Coffee, desc: 'Special: Wood-fired pizzas, rice bowls & fresh smoothies' },
    { title: 'High-Performance GPU Cluster', status: '64 Pods Running', metric: '92% Compute Load', icon: Wifi, desc: 'NVIDIA A100 server nodes open for student research tasks' },
    { title: 'Campus Sports & Fitness Arena', status: 'Open until 10 PM', metric: '45 / 150 In Gym', icon: Dumbbell, desc: 'Olympic-size pool, indoor badminton courts & cardio zone' },
    { title: 'Student Health & Wellness Clinic', status: 'Physician on Duty', metric: 'Zero Queue', icon: Building, desc: 'First aid, regular medical checkups & 24/7 campus ambulance' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            SMART SPATIAL INFRASTRUCTURE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Campus Services & Interactive 3D Map
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time facility occupancy, building navigation, and campus amenities.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-slate-950 px-4 py-2 rounded-2xl border border-white/10">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Interactive 3D University Digital Twin</span>
        </div>
      </div>

      {/* 3D Campus Digital Twin Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span>Click any 3D building block to inspect live occupancy and telemetry:</span>
          <span className="font-mono text-cyan-400">Drag to pan • Click to select</span>
        </div>
        <CommandCenter3D
          facilities={facilities}
          onSelectBuilding={fac => setSelectedFacility(fac)}
        />
      </div>

      {/* Campus Services Directory */}
      <div className="pt-4">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Live Campus Amenities & Student Hubs</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {campusServices.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{svc.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{svc.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-emerald-400 font-semibold">{svc.status}</span>
                  <span className="font-mono font-bold text-cyan-300 text-[11px]">{svc.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
