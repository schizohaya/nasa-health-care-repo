import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Wind, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Download, 
  Radio, 
  Send,
  Zap,
  CheckCircle2,
  ChevronRight,
  TrendingUp
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

export default function AstronautDetailModal({ 
  astronaut, 
  onClose,
  onOpenTelemetryModal 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'charts' | 'timeline' | 'history'

  if (!astronaut) return null;

  const vitals = astronaut.currentVitals || {};
  const summary = astronaut.dailySummary || {};
  const hourlyData = astronaut.hourlyReadings || [];
  const timeline = astronaut.timeline || [];
  const alerts = astronaut.alerts || [];
  const history = astronaut.history || [];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(astronaut, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${astronaut.id}_telemetry_packet.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#080d1a] border border-cyan-500/40 rounded-2xl shadow-2xl glow-cyan overflow-hidden my-auto">
        
        {/* Modal Header: 1. Astronaut Profile and Mission Details */}
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-cyan-900/40 bg-gradient-to-r from-[#0d1627] to-[#091122]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-heading text-xl font-bold">
              {astronaut.name.split(' ').slice(-1)[0][0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {astronaut.name}
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  {astronaut.id}
                </span>
                <StatusBadge status={astronaut.status} size="sm" />
              </div>
              <p className="text-xs text-cyan-300/80 font-mono mt-0.5">
                {astronaut.role} &bull; {astronaut.mission} &bull; {astronaut.missionDuration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#141e33] border border-cyan-800/60 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={onOpenTelemetryModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inject Telemetry</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="shrink-0 flex items-center gap-2 px-6 py-2.5 bg-[#0a0f1e] border-b border-cyan-950/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Overview & Vitals
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'charts'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2-4. Detailed Bio-Charts
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'timeline'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5. Daily Timeline
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            6-7. History & Alerts
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & 8. DETAILED 24-HOUR HEALTH OVERVIEW */}
          {(activeTab === 'overview' || activeTab === 'all') && (
            <div className="space-y-6">
              {/* Primary Vitals Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-rose-500/30">
                  <span className="text-[11px] font-mono uppercase text-rose-300">Cardiac Frequency</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold font-heading text-white">{vitals.heartRate ?? 72}</span>
                    <span className="text-xs font-mono text-rose-400">BPM</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Resting Baseline: 58</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-cyan-500/30">
                  <span className="text-[11px] font-mono uppercase text-cyan-300">Blood Oxygen (SpO2)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold font-heading text-white">{vitals.oxygenLevel ?? 98.4}</span>
                    <span className="text-xs font-mono text-cyan-400">%</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Threshold: &gt;95.0%</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-amber-500/30">
                  <span className="text-[11px] font-mono uppercase text-amber-300">Core Body Temp</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold font-heading text-white">{vitals.bodyTemperature ?? 36.6}</span>
                    <span className="text-xs font-mono text-amber-400">°C</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Thermal Index: Stable</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-blue-500/30">
                  <span className="text-[11px] font-mono uppercase text-blue-300">Radiation Dose Today</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold font-heading text-white">{vitals.radiationDose ?? 0.38}</span>
                    <span className="text-xs font-mono text-blue-400">mSv</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Safe Limit: &lt;1.0 mSv/d</span>
                </div>
              </div>

              {/* 8. Detailed 24-Hour Health Overview Section */}
              <div className="rounded-xl bg-[#0d1424] border border-cyan-900/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-white font-heading">
                      POINT 8 &bull; DETAILED 24-HOUR HEALTH OVERVIEW
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">COMPREHENSIVE FLIGHT SURGEON EVALUATION</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#11192e] border border-slate-800">
                    <span className="text-slate-400 block mb-1">MISSION READINESS INDEX</span>
                    <span className="text-2xl font-bold text-cyan-300">{summary.readinessScore ?? 94} / 100</span>
                    <p className="text-[11px] text-slate-400 mt-1">Calculated via HRV, SpO2 stability, sleep duration, and core temp variance.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#11192e] border border-slate-800">
                    <span className="text-slate-400 block mb-1">SLEEP ARCHITECTURE (LAST 24H)</span>
                    <span className="text-2xl font-bold text-indigo-300">{summary.sleepHours ?? 7.5} Hours</span>
                    <p className="text-[11px] text-slate-400 mt-1">{summary.sleepEfficiency ?? "Standard REM distribution"}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#11192e] border border-slate-800">
                    <span className="text-slate-400 block mb-1">METABOLIC EXPENDITURE</span>
                    <span className="text-2xl font-bold text-amber-300">{summary.caloricExpenditure ?? 2680} kcal</span>
                    <p className="text-[11px] text-slate-400 mt-1">Hydration status: 100% adherence to electrolyte schedule.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase block mb-1">
                    Flight Surgeon Operational Assessment:
                  </span>
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{summary.flightSurgeonNote ?? "Vitals within permissible operational tolerances."}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POINTS 2, 3, 4 - DETAILED BIO CHARTS */}
          {(activeTab === 'charts' || activeTab === 'all') && (
            <div className="space-y-6">
              {/* 2. Heart Rate Monitoring Chart */}
              <div className="rounded-xl bg-[#0d1424] border border-rose-500/30 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <h4 className="text-sm font-bold text-white font-heading">
                      POINT 2 &bull; 24-HOUR HEART RATE MONITORING CHART (BPM)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-rose-300">Range: 50 - 150 BPM</span>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="modalHr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis domain={[50, 160]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f43f5e', fontSize: '11px' }} />
                      <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Tachycardia', fill: '#f59e0b', fontSize: 10 }} />
                      <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#modalHr)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 3. Oxygen Saturation Chart */}
              <div className="rounded-xl bg-[#0d1424] border border-cyan-500/30 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white font-heading">
                      POINT 3 &bull; 24-HOUR OXYGEN SATURATION (SpO2 %) CHART
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">Warning Threshold: &lt;95%</span>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="modalO2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis domain={[90, 100]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', fontSize: '11px' }} />
                      <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Hypoxia Alarm (<95%)', fill: '#ef4444', fontSize: 10 }} />
                      <Area type="monotone" dataKey="oxygenLevel" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#modalO2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 4. Body Temperature Chart */}
              <div className="rounded-xl bg-[#0d1424] border border-amber-500/30 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white font-heading">
                      POINT 4 &bull; 24-HOUR BODY TEMPERATURE CHART (°C)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-amber-300">Baseline: 36.5 - 37.2°C</span>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis domain={[36.0, 39.0]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', fontSize: '11px' }} />
                      <ReferenceLine y={37.8} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Hyperthermia (>37.8°C)', fill: '#ef4444', fontSize: 10 }} />
                      <Line type="monotone" dataKey="bodyTemperature" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 2.5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: POINT 5 - DAILY HEALTH TIMELINE */}
          {(activeTab === 'timeline' || activeTab === 'all') && (
            <div className="rounded-xl bg-[#0d1424] border border-cyan-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white font-heading">
                    POINT 5 &bull; DAILY HEALTH & OPERATIONAL TIMELINE
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">CHRONOLOGICAL EVENT LOG</span>
              </div>

              <div className="space-y-3">
                {timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-lg bg-[#11192e] border border-slate-800">
                    <span className="font-mono font-bold text-cyan-400 text-xs shrink-0 w-20">
                      {event.time}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-200">{event.title}</span>
                        <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-slate-800 text-slate-400 uppercase">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: POINTS 6 & 7 - PREVIOUS READINGS & ALERTS */}
          {(activeTab === 'history' || activeTab === 'all') && (
            <div className="space-y-6">
              {/* Point 7: Health Alerts and their Timestamps */}
              <div className="rounded-xl bg-[#0d1424] border border-amber-500/30 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white font-heading">
                      POINT 7 &bull; HEALTH ALERTS & TIMESTAMPS
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-amber-300">{alerts.length} NOTIFICATIONS</span>
                </div>

                <div className="space-y-2.5">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border text-xs font-mono flex items-start justify-between gap-3 ${
                        alert.severity === 'critical'
                          ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                          : alert.severity === 'warning'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                          alert.severity === 'critical' ? 'bg-rose-400 animate-ping' :
                          alert.severity === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'
                        }`} />
                        <div>
                          <span className="font-bold uppercase tracking-wider block mb-0.5">
                            [{alert.severity.toUpperCase()}] {alert.message}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {alert.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Point 6: Previous Health Readings */}
              <div className="rounded-xl bg-[#0d1424] border border-cyan-900/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-base font-bold text-white font-heading">
                      POINT 6 &bull; PREVIOUS HEALTH READINGS ARCHIVE
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400">HISTORICAL TELEMETRY LOGS</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                        <th className="pb-2">Timestamp</th>
                        <th className="pb-2">Heart Rate</th>
                        <th className="pb-2">SpO2 Level</th>
                        <th className="pb-2">Core Temp</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Clinical Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {history.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-2.5 text-slate-300">{row.timestamp}</td>
                          <td className="py-2.5 text-rose-300 font-bold">{row.heartRate} BPM</td>
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
                          <td className="py-2.5 text-slate-400">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-cyan-950/60 bg-[#060a14] text-xs font-mono text-slate-400">
          <span>ASTRA HEALTH &bull; FLIGHT MEDICAL CONSOLE &bull; ALL 8 INSPECTION POINTS ACTIVE</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
