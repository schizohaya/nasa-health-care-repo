import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Heart, 
  Wind, 
  Thermometer, 
  Activity, 
  Radio, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Send, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import AstronautDetailModal from './AstronautDetailModal';

export default function MissionControlDashboard({ 
  astronauts = [], 
  onOpenTelemetryModal,
  backendStatus = {},
  liveTelemetryList = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NORMAL' | 'WARNING' | 'CRITICAL'
  const [missionFilter, setMissionFilter] = useState('ALL');
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);

  // Calculate status counts
  const totalCount = astronauts.length;
  const normalCount = astronauts.filter(a => a.status === 'NORMAL').length;
  const warningCount = astronauts.filter(a => a.status === 'WARNING').length;
  const criticalCount = astronauts.filter(a => a.status === 'CRITICAL').length;

  // Filter astronauts
  const filteredAstronauts = astronauts.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesMission = missionFilter === 'ALL' || a.mission.includes(missionFilter);

    return matchesSearch && matchesStatus && matchesMission;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Mission Control Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Total Monitored */}
        <div 
          onClick={() => setStatusFilter('ALL')}
          className={`p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            statusFilter === 'ALL'
              ? 'bg-[#101a33] border-cyan-400 glow-cyan'
              : 'bg-[#0a0f1d] border-cyan-900/40 hover:border-cyan-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400 mb-2">
            <span>Total Crew</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-heading text-white">{totalCount}</span>
            <span className="text-[11px] font-mono text-cyan-300">ACTIVE</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 mt-1">Deep Space & Orbital</p>
        </div>

        {/* Normal State */}
        <div 
          onClick={() => setStatusFilter('NORMAL')}
          className={`p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            statusFilter === 'NORMAL'
              ? 'bg-[#08221c] border-emerald-400 glow-emerald'
              : 'bg-[#0a0f1d] border-emerald-900/40 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-emerald-400 mb-2">
            <span>Normal</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-heading text-emerald-300">{normalCount}</span>
            <span className="text-[11px] font-mono text-emerald-400">NOMINAL</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 mt-1">Full Mission Readiness</p>
        </div>

        {/* Warning State */}
        <div 
          onClick={() => setStatusFilter('WARNING')}
          className={`p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            statusFilter === 'WARNING'
              ? 'bg-[#291e0a] border-amber-400 glow-amber'
              : 'bg-[#0a0f1d] border-amber-900/40 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-amber-400 mb-2">
            <span>Warning</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-heading text-amber-300">{warningCount}</span>
            <span className="text-[11px] font-mono text-amber-400">ELEVATED</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 mt-1">Surgeon Monitoring</p>
        </div>

        {/* Critical Demo State */}
        <div 
          onClick={() => setStatusFilter('CRITICAL')}
          className={`p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            statusFilter === 'CRITICAL'
              ? 'bg-[#2c0d12] border-rose-400 glow-red'
              : 'bg-[#0a0f1d] border-rose-900/40 hover:border-rose-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-rose-400 mb-2">
            <span>Critical</span>
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-heading text-rose-300">{criticalCount}</span>
            <span className="text-[11px] font-mono text-rose-400">ACTION REQ</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 mt-1">Airlock Ingress Alert</p>
        </div>

        {/* Backend & Network Feed */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-4 rounded-xl border border-cyan-900/40 bg-[#0a0f1d] backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400">
            <span>Data Stream</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-1">
            <span className={`text-sm font-bold font-mono ${backendStatus.online ? 'text-emerald-400' : 'text-amber-400'}`}>
              {backendStatus.online ? 'FASTAPI LIVE' : 'DEMO MODE'}
            </span>
            <p className="text-[10px] font-mono text-slate-400">
              {liveTelemetryList.length} Supabase Record(s)
            </p>
          </div>
          <button
            onClick={onOpenTelemetryModal}
            className="w-full py-1 text-[11px] font-mono font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            + Inject Reading
          </button>
        </div>
      </div>

      {/* Search, Filter & Mission Selector Bar */}
      <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search astronaut by name, callsign, ID (e.g. AST-001, Sarah Chen)..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[#11192e] border border-cyan-900/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mission Dropdown */}
          <select
            value={missionFilter}
            onChange={(e) => setMissionFilter(e.target.value)}
            className="bg-[#11192e] border border-cyan-900/60 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Missions</option>
            <option value="Artemis VII">Artemis VII (Gateway)</option>
            <option value="ISS Expedition 74">ISS Expedition 74</option>
          </select>

          {/* Status Pills */}
          <div className="flex items-center gap-1 bg-[#11192e] p-1 rounded-xl border border-cyan-900/60 text-xs font-mono">
            {['ALL', 'NORMAL', 'WARNING', 'CRITICAL'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Astronaut Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAstronauts.map((astronaut) => {
          const vitals = astronaut.currentVitals || {};
          const isSelected = selectedAstronaut?.id === astronaut.id;

          return (
            <div
              key={astronaut.id}
              onClick={() => setSelectedAstronaut(astronaut)}
              className={`relative rounded-2xl bg-[#090e1c] border p-5 shadow-xl transition-all cursor-pointer group hover:scale-[1.01] ${
                astronaut.status === 'CRITICAL'
                  ? 'border-rose-500/50 hover:border-rose-400 hover:glow-red'
                  : astronaut.status === 'WARNING'
                  ? 'border-amber-500/40 hover:border-amber-400 hover:glow-amber'
                  : 'border-cyan-900/40 hover:border-cyan-400/60 hover:glow-cyan'
              }`}
            >
              {/* Header: Name, ID, Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-heading text-lg font-bold">
                    {astronaut.name.split(' ').slice(-1)[0][0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                      {astronaut.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span>{astronaut.id}</span>
                      <span>&bull;</span>
                      <span className="text-cyan-400 uppercase">{astronaut.callsign}</span>
                    </div>
                  </div>
                </div>

                <StatusBadge status={astronaut.status} size="xs" />
              </div>

              {/* Role & Mission Details */}
              <p className="text-xs text-slate-300 mb-4 line-clamp-1">
                {astronaut.role}
              </p>

              <div className="p-2.5 rounded-lg bg-[#0e162b] border border-slate-800/80 mb-4 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>{astronaut.mission}</span>
                <span className="text-amber-300">{astronaut.missionDuration}</span>
              </div>

              {/* Live Vitals Badges Grid */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                {/* Heart Rate */}
                <div className="p-2 rounded-lg bg-[#11192e] border border-rose-500/20">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-rose-300 uppercase mb-0.5">
                    <Heart className="w-3 h-3 text-rose-400" />
                    <span>Heart</span>
                  </div>
                  <span className="text-lg font-bold text-white font-heading">
                    {vitals.heartRate ?? '--'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">BPM</span>
                </div>

                {/* Oxygen Level */}
                <div className="p-2 rounded-lg bg-[#11192e] border border-cyan-500/20">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-cyan-300 uppercase mb-0.5">
                    <Wind className="w-3 h-3 text-cyan-400" />
                    <span>SpO2</span>
                  </div>
                  <span className="text-lg font-bold text-white font-heading">
                    {vitals.oxygenLevel ?? '--'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">%</span>
                </div>

                {/* Temperature */}
                <div className="p-2 rounded-lg bg-[#11192e] border border-amber-500/20">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-amber-300 uppercase mb-0.5">
                    <Thermometer className="w-3 h-3 text-amber-400" />
                    <span>Temp</span>
                  </div>
                  <span className="text-lg font-bold text-white font-heading">
                    {vitals.bodyTemperature ?? '--'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">°C</span>
                </div>
              </div>

              {/* Click to open detail prompt */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  Inspect All 8 Bio-Points <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-slate-500">SUIT: {astronaut.suitId}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAstronauts.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 text-slate-400 font-mono">
          <p className="text-base font-semibold text-slate-200">No astronauts matching search criteria.</p>
          <p className="text-xs mt-1">Try clearing filters or search queries.</p>
        </div>
      )}

      {/* Selected Astronaut Detailed Health Monitoring Screen (Modal) */}
      {selectedAstronaut && (
        <AstronautDetailModal
          astronaut={selectedAstronaut}
          onClose={() => setSelectedAstronaut(null)}
          onOpenTelemetryModal={onOpenTelemetryModal}
        />
      )}
    </div>
  );
}
