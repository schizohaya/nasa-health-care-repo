import React, { useState } from 'react';
import { 
  Heart, 
  Wind, 
  Thermometer, 
  Activity, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  Zap, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Bell, 
  Moon, 
  Flame, 
  Radio, 
  FileText, 
  ChevronRight,
  TrendingUp,
  Info,
  Send
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import StatusBadge from '../common/StatusBadge';

export default function AstronautPortal({ 
  astronaut, 
  allAstronauts, 
  onSelectAstronaut,
  onOpenTelemetryModal,
  isLiveApiData = false
}) {
  const [chartMetric, setChartMetric] = useState('heartRate'); // 'heartRate' | 'oxygenLevel' | 'bodyTemperature' | 'combined'

  if (!astronaut) return null;

  const vitals = astronaut.currentVitals || {};
  const summary = astronaut.dailySummary || {};
  const hourlyData = astronaut.hourlyReadings || [];
  const timeline = astronaut.timeline || [];
  const alerts = astronaut.alerts || [];
  const history = astronaut.history || [];

  return (
    <div className="space-y-6">
      {/* Top Banner: Astronaut Profile & Identity */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#091122] to-[#0d182b] border border-cyan-500/30 p-6 glow-cyan">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Astronaut Details & Avatar */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-blue-900/40 border-2 border-cyan-400/50 flex items-center justify-center text-cyan-300 font-heading text-2xl font-bold shadow-xl shadow-cyan-950/60">
                {astronaut.name.split(' ').slice(-1)[0][0]}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <StatusBadge status={astronaut.status} size="xs" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  {astronaut.name}
                </h1>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  {astronaut.id} &bull; CALLSIGN: {astronaut.callsign.toUpperCase()}
                </span>
                {isLiveApiData && (
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 animate-pulse">
                    LIVE SUPABASE TELEMETRY
                  </span>
                )}
              </div>

              <p className="text-sm text-cyan-300/80 font-medium">
                {astronaut.role} &bull; <span className="text-slate-400">{astronaut.rank}</span>
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="text-slate-500">MISSION:</span>
                  <strong className="text-slate-200">{astronaut.mission}</strong>
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <strong className="text-amber-300">{astronaut.missionDuration}</strong>
                </span>
                <span className="text-slate-600">&bull;</span>
                <span>SPACECRAFT: <strong className="text-slate-200">{astronaut.spacecraft}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Controls: Switch Astronaut & Log Vitals */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Astronaut Switcher Dropdown */}
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                Switch Monitored Crew
              </label>
              <select
                value={astronaut.id}
                onChange={(e) => {
                  const target = allAstronauts.find(a => a.id === e.target.value);
                  if (target) onSelectAstronaut(target);
                }}
                className="bg-[#121c32] border border-cyan-800/60 rounded-lg px-3 py-1.5 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
              >
                {allAstronauts.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.id} - {a.name} ({a.status})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onOpenTelemetryModal}
              className="flex items-center justify-center gap-2 px-4 py-2 mt-auto text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-900/40 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log Vitals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Health Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className="relative rounded-xl bg-[#0c1322]/80 border border-rose-500/30 p-5 backdrop-blur-md shadow-lg hover:border-rose-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-rose-300/80 tracking-wider">
              Cardiac Frequency
            </span>
            <div className="p-2 rounded-lg bg-rose-500/15 text-rose-400 animate-vital-pulse">
              <Heart className="w-5 h-5 fill-rose-500/30" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-heading text-white">
              {vitals.heartRate ?? 72}
            </span>
            <span className="text-xs font-mono text-rose-300">BPM</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
            <span>Resting: 58 BPM</span>
            <span className="text-emerald-400">Sinus Rhythm</span>
          </div>
        </div>

        {/* Blood Oxygen Saturation */}
        <div className="relative rounded-xl bg-[#0c1322]/80 border border-cyan-500/30 p-5 backdrop-blur-md shadow-lg hover:border-cyan-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-cyan-300/80 tracking-wider">
              Blood Oxygen (SpO2)
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400">
              <Wind className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-heading text-white">
              {vitals.oxygenLevel ?? 98.4}
            </span>
            <span className="text-xs font-mono text-cyan-300">%</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
            <span>Nominal: &gt;95.0%</span>
            <span className={(vitals.oxygenLevel ?? 98) < 95 ? 'text-amber-400 font-bold' : 'text-cyan-400'}>
              {(vitals.oxygenLevel ?? 98) < 95 ? 'Sub-Nominal' : 'Optimal'}
            </span>
          </div>
        </div>

        {/* Body Temperature */}
        <div className="relative rounded-xl bg-[#0c1322]/80 border border-amber-500/30 p-5 backdrop-blur-md shadow-lg hover:border-amber-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-amber-300/80 tracking-wider">
              Core Temperature
            </span>
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <Thermometer className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-heading text-white">
              {vitals.bodyTemperature ?? 36.6}
            </span>
            <span className="text-xs font-mono text-amber-300">°C</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
            <span>Target: 36.5 - 37.2°C</span>
            <span className={(vitals.bodyTemperature ?? 36.6) > 37.8 ? 'text-rose-400 font-bold' : 'text-amber-400'}>
              {(vitals.bodyTemperature ?? 36.6) > 37.8 ? 'Hyperthermia' : 'Stable'}
            </span>
          </div>
        </div>

        {/* Mission Readiness / Health Index */}
        <div className="relative rounded-xl bg-[#0c1322]/80 border border-blue-500/30 p-5 backdrop-blur-md shadow-lg hover:border-blue-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-blue-300/80 tracking-wider">
              Bio-Readiness Score
            </span>
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-heading text-white">
              {summary.readinessScore ?? 94}
            </span>
            <span className="text-xs font-mono text-blue-300">/ 100</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
            <span>Radiation: {vitals.radiationDose ?? 0.38} mSv</span>
            <span className="text-blue-300">{astronaut.status}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Charts & Daily Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive 24-Hour Telemetry Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  24-HOUR BIOMETRIC MONITORING TIMELINE
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Continuous orbital telemetry feed &bull; Sample interval: Hourly
              </p>
            </div>

            {/* Chart Metric Selector Pills */}
            <div className="flex items-center gap-1 bg-[#131b2e] p-1 rounded-lg border border-cyan-900/50 text-xs font-mono">
              <button
                onClick={() => setChartMetric('heartRate')}
                className={`px-3 py-1 rounded transition-colors ${
                  chartMetric === 'heartRate'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setChartMetric('oxygenLevel')}
                className={`px-3 py-1 rounded transition-colors ${
                  chartMetric === 'oxygenLevel'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SpO2 %
              </button>
              <button
                onClick={() => setChartMetric('bodyTemperature')}
                className={`px-3 py-1 rounded transition-colors ${
                  chartMetric === 'bodyTemperature'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Core Temp
              </button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartMetric === 'heartRate' && (
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis domain={[50, 160]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f43f5e', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(value) => [`${value} BPM`, 'Heart Rate']}
                    labelFormatter={(label) => `Time: ${label} UTC`}
                  />
                  <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Tachycardia', fill: '#f59e0b', fontSize: 10 }} />
                  <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#hrGrad)" />
                </AreaChart>
              )}

              {chartMetric === 'oxygenLevel' && (
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="o2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis domain={[90, 100]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(value) => [`${value} %`, 'SpO2 Saturation']}
                    labelFormatter={(label) => `Time: ${label} UTC`}
                  />
                  <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Warning <95%', fill: '#ef4444', fontSize: 10 }} />
                  <Area type="monotone" dataKey="oxygenLevel" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#o2Grad)" />
                </AreaChart>
              )}

              {chartMetric === 'bodyTemperature' && (
                <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis domain={[36.0, 39.0]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(value) => [`${value} °C`, 'Core Temp']}
                    labelFormatter={(label) => `Time: ${label} UTC`}
                  />
                  <ReferenceLine y={37.5} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Elevated >37.5°C', fill: '#f59e0b', fontSize: 10 }} />
                  <Line type="monotone" dataKey="bodyTemperature" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 3 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Health Summary & Flight Surgeon Assessment */}
        <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                DAILY HEALTH SUMMARY
              </h3>
            </div>

            <div className="space-y-3.5">
              {/* Sleep Architecture */}
              <div className="p-3 rounded-xl bg-[#11192e] border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    Sleep Architecture
                  </span>
                  <span className="text-indigo-300 font-semibold">{summary.sleepHours ?? 7.5} hrs</span>
                </div>
                <p className="text-xs text-slate-300">{summary.sleepEfficiency ?? "Normal REM Cycle"}</p>
              </div>

              {/* Metabolic Burn */}
              <div className="p-3 rounded-xl bg-[#11192e] border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Caloric Expenditure
                  </span>
                  <span className="text-amber-300 font-semibold">{summary.caloricExpenditure ?? 2600} kcal</span>
                </div>
                <p className="text-xs text-slate-300">Target daily intake: 2,800 kcal &bull; Hydration: 2.5L</p>
              </div>

              {/* EVA Status */}
              <div className="p-3 rounded-xl bg-[#11192e] border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    EVA Readiness
                  </span>
                  <span className="text-cyan-300 font-semibold">Suit {astronaut.suitId}</span>
                </div>
                <p className="text-xs text-slate-300">{summary.evaStatus ?? "Standby"}</p>
              </div>

              {/* Flight Surgeon Note */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-500/30">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 font-bold mb-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  FLIGHT SURGEON NOTE
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{summary.flightSurgeonNote ?? "Vitals within permissible operational tolerances for current mission phase."}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Health Timeline & Personal Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Timeline */}
        <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                DAILY HEALTH & OPERATIONAL TIMELINE
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">TODAY</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-900/40">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -left-[23px] top-1.5 w-3 h-3 rounded-full border-2 ${
                  item.status === 'critical' ? 'bg-rose-500 border-rose-300 animate-ping' :
                  item.status === 'warning' ? 'bg-amber-500 border-amber-300' :
                  'bg-cyan-500 border-cyan-300'
                }`} />

                <div className="p-3 rounded-xl bg-[#0e162a]/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-cyan-400">{item.time}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Alerts & Historical Readings */}
        <div className="space-y-6">
          {/* Personal Health Alerts */}
          <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  PERSONAL HEALTH ALERTS
                </h3>
              </div>
              <span className="px-2 py-0.5 text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                {alerts.length} ALERTS
              </span>
            </div>

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-xs text-slate-400 font-mono italic">No active alerts recorded.</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-xl border text-xs font-mono flex items-start gap-3 ${
                      alert.severity === 'critical'
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : alert.severity === 'warning'
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                        : 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                    }`}
                  >
                    <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-rose-400 animate-bounce' :
                      alert.severity === 'warning' ? 'text-amber-400' : 'text-cyan-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase tracking-wider">{alert.severity} NOTICE</span>
                        <span className="text-[11px] opacity-75">{alert.timestamp}</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{alert.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Historical Health Readings */}
          <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  RECENT LOGGED READINGS
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">TELEMETRY HISTORY</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2">Timestamp</th>
                    <th className="pb-2">HR (BPM)</th>
                    <th className="pb-2">SpO2</th>
                    <th className="pb-2">Temp</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 text-slate-300">{row.timestamp}</td>
                      <td className="py-2.5 text-rose-300 font-bold">{row.heartRate}</td>
                      <td className="py-2.5 text-cyan-300 font-bold">{row.oxygenLevel}%</td>
                      <td className="py-2.5 text-amber-300 font-bold">{row.bodyTemperature}°C</td>
                      <td className="py-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          row.status === 'Critical' ? 'bg-rose-500/20 text-rose-300' :
                          row.status === 'Warning' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
