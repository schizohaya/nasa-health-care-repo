import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import AstronautPortal from './components/astronaut/AstronautPortal';
import MissionControlDashboard from './components/mission-control/MissionControlDashboard';
import NasaDataSection from './components/nasa/NasaDataSection';
import TelemetryModal from './components/common/TelemetryModal';
import { INITIAL_ASTRONAUTS } from './data/mockAstronauts';
import { api } from './services/api';
import {
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  History,
  Bell,
  Settings,
  HelpCircle,
  ShieldCheck,
  Sliders,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('mission-control');
  // 'mission-control' | 'astronaut' | 'nasa-data' | 'history' | 'alerts' | 'settings' | 'help'
  const [astronauts, setAstronauts] = useState(INITIAL_ASTRONAUTS);
  const [selectedAstronautId, setSelectedAstronautId] = useState('AST-001');
  
  // Navigation Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // User Profile & Role state
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Sarah Chen, MD',
    id: 'AST-001',
    role: 'Flight Surgeon & Mission Specialist',
    roleCategory: 'Astronaut', // 'Astronaut' | 'Facility Staff'
    organization: 'NASA Human Research Program (HRP)',
    clearance: 'Level-3 Deep Space Bio-Security',
    mission: 'Artemis VII Gateway',
    station: 'Lunar Gateway Habitat Module'
  });

  // Switch Role handler
  const handleSwitchRole = (newCategory) => {
    if (newCategory === 'Facility Staff') {
      setUserProfile(prev => ({
        ...prev,
        name: 'Dr. Marcus Vance, PhD',
        id: 'MED-F09',
        role: 'Chief Flight Surgeon / Ground Controller',
        roleCategory: 'Facility Staff',
        organization: 'NASA Johnson Space Center — Mission Control',
        clearance: 'Level-4 Mission Flight Director',
        mission: 'Operations Ground Support',
        station: 'JSC Mission Control Center, Houston'
      }));
    } else {
      setUserProfile(prev => ({
        ...prev,
        name: 'Dr. Sarah Chen, MD',
        id: 'AST-001',
        role: 'Flight Surgeon & Mission Specialist',
        roleCategory: 'Astronaut',
        organization: 'NASA Human Research Program (HRP)',
        clearance: 'Level-3 Deep Space Bio-Security',
        mission: 'Artemis VII Gateway',
        station: 'Lunar Gateway Habitat Module'
      }));
    }
  };

  // Backend & Telemetry state
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });
  const [liveTelemetryList, setLiveTelemetryList] = useState([]);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync backend telemetry with astronauts roster
  const syncTelemetryData = useCallback((records) => {
    if (!Array.isArray(records) || records.length === 0) return;

    setAstronauts((prevAstronauts) => {
      return prevAstronauts.map((astro) => {
        const matchingRecords = records.filter(r => r.astronaut_id === astro.id);
        if (matchingRecords.length === 0) return astro;

        const latest = matchingRecords[matchingRecords.length - 1];

        let calculatedStatus = 'NORMAL';
        if (latest.heart_rate > 120 || latest.oxygen_level < 93 || latest.body_temperature > 38.2) {
          calculatedStatus = 'CRITICAL';
        } else if (latest.heart_rate > 95 || latest.oxygen_level < 95.5 || latest.body_temperature > 37.5) {
          calculatedStatus = 'WARNING';
        }

        const newVitals = {
          ...astro.currentVitals,
          heartRate: Number(latest.heart_rate),
          oxygenLevel: Number(latest.oxygen_level),
          bodyTemperature: Number(latest.body_temperature),
        };

        const timestampStr = latest.recorded_at
          ? new Date(latest.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
          : 'Live Sync';

        const newHistoryEntry = {
          id: `supabase-${latest.id || Math.random()}`,
          timestamp: timestampStr,
          heartRate: Number(latest.heart_rate),
          oxygenLevel: Number(latest.oxygen_level),
          bodyTemperature: Number(latest.body_temperature),
          status: calculatedStatus === 'CRITICAL' ? 'Critical' : calculatedStatus === 'WARNING' ? 'Warning' : 'Normal',
          notes: 'Ingested from FastAPI & Supabase'
        };

        const existingHist = astro.history || [];
        const updatedHistory = existingHist.some(h => h.id === newHistoryEntry.id)
          ? existingHist
          : [newHistoryEntry, ...existingHist];

        return {
          ...astro,
          status: calculatedStatus,
          currentVitals: newVitals,
          history: updatedHistory,
          isLiveApi: true,
        };
      });
    });
  }, []);

  // Poll or check backend
  const refreshBackend = useCallback(async () => {
    setBackendStatus(prev => ({ ...prev, checking: true }));
    
    const health = await api.checkHealth();
    setBackendStatus({ online: health.online, checking: false });

    if (health.online) {
      const telRes = await api.getTelemetry();
      if (telRes.success && telRes.data) {
        setLiveTelemetryList(telRes.data);
        syncTelemetryData(telRes.data);
      }
    }
  }, [syncTelemetryData]);

  // Initial mount & periodic polling
  useEffect(() => {
    refreshBackend();
    const interval = setInterval(refreshBackend, 25000);
    return () => clearInterval(interval);
  }, [refreshBackend]);

  // Handle telemetry submission from modal
  const handleTelemetrySubmitted = async (payload) => {
    setToastMessage({
      type: 'success',
      text: `Telemetry packet for ${payload.astronaut_id} successfully sent to backend!`
    });
    setTimeout(() => setToastMessage(null), 5000);
    await refreshBackend();
  };

  // Find currently selected astronaut for Astronaut Portal
  const activeAstronaut = astronauts.find(a => a.id === selectedAstronautId) || astronauts[0];

  // Aggregated alerts across all astronauts for the Alerts section
  const allCrewAlerts = astronauts.flatMap(astro =>
    (astro.alerts || []).map(alert => ({
      ...alert,
      astronautName: astro.name,
      astronautId: astro.id,
      callsign: astro.callsign
    }))
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col space-grid">
      {/* Sidebar Navigation Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tabId) => setCurrentTab(tabId)}
        activeUser={userProfile}
        backendStatus={backendStatus}
        telemetryCount={liveTelemetryList.length}
      />

      {/* Header with Navigation and Profile Menu */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        backendStatus={backendStatus}
        onRefreshBackend={refreshBackend}
        onOpenTelemetryModal={() => setIsTelemetryModalOpen(true)}
        telemetryCount={liveTelemetryList.length}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        activeUser={userProfile}
        onSwitchRole={handleSwitchRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Optional Toast Notification */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              &times;
            </button>
          </div>
        )}

        {/* TAB 1: Astronaut Portal */}
        {currentTab === 'astronaut' && (
          <AstronautPortal
            astronaut={activeAstronaut}
            allAstronauts={astronauts}
            onSelectAstronaut={(target) => setSelectedAstronautId(target.id)}
            onOpenTelemetryModal={() => setIsTelemetryModalOpen(true)}
            isLiveApiData={activeAstronaut.isLiveApi}
          />
        )}

        {/* TAB 2: Mission Control / Facility Dashboard */}
        {currentTab === 'mission-control' && (
          <MissionControlDashboard
            astronauts={astronauts}
            onOpenTelemetryModal={() => setIsTelemetryModalOpen(true)}
            backendStatus={backendStatus}
            liveTelemetryList={liveTelemetryList}
          />
        )}

        {/* TAB 3: NASA Data & Science */}
        {currentTab === 'nasa-data' && (
          <NasaDataSection />
        )}

        {/* TAB 4: Health History */}
        {currentTab === 'history' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#091122] to-[#0d182b] border border-cyan-500/30 p-5 sm:p-6 glow-cyan">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    MISSION TELEMETRY & HEALTH HISTORY
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Audit trail of real-time sensor recordings and FastAPI ingestion
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-4 sm:p-6 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Logged Roster Records ({activeAstronaut.name})</span>
                </h3>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-800">
                  {activeAstronaut.history?.length || 0} Telemetry Points
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="pb-3 px-2">Timestamp</th>
                      <th className="pb-3 px-2">Heart Rate</th>
                      <th className="pb-3 px-2">Oxygen (SpO2)</th>
                      <th className="pb-3 px-2">Core Temp</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 px-2">Source / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(activeAstronaut.history || []).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 text-slate-300 whitespace-nowrap">{row.timestamp}</td>
                        <td className="py-3 px-2 text-rose-300 font-bold whitespace-nowrap">{row.heartRate} BPM</td>
                        <td className="py-3 px-2 text-cyan-300 font-bold whitespace-nowrap">{row.oxygenLevel}%</td>
                        <td className="py-3 px-2 text-amber-300 font-bold whitespace-nowrap">{row.bodyTemperature}°C</td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            row.status === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                            row.status === 'Warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-400 text-[11px] truncate max-w-xs">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Alerts */}
        {currentTab === 'alerts' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-[#2c0d12] via-[#1a0a14] to-[#0f172a] border border-rose-500/40 p-5 sm:p-6 glow-red">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/20 rounded-xl text-rose-400">
                  <Bell className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    CREW MEDICAL & ENVIRONMENTAL ALERTS
                  </h2>
                  <p className="text-xs text-rose-300/80 font-mono">
                    Real-time threshold breaches, telemetry anomalies, and flight surgeon notices
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allCrewAlerts.map((alert, idx) => (
                <div
                  key={`${alert.id}-${idx}`}
                  className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                    alert.severity === 'critical'
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : alert.severity === 'warning'
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{alert.severity} &bull; {alert.astronautName} ({alert.callsign})</span>
                    </span>
                    <span className="text-[10px] opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="leading-relaxed text-sm opacity-90">{alert.message}</p>
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] opacity-75">
                    <span>ASTRONAUT ID: {alert.astronautId}</span>
                    <button
                      onClick={() => {
                        setSelectedAstronautId(alert.astronautId);
                        setCurrentTab('astronaut');
                      }}
                      className="underline hover:text-white"
                    >
                      View Crew File &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Settings */}
        {currentTab === 'settings' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    BIO-TELEMETRY CONSOLE SETTINGS
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Configure thresholds, units, and communications channel
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0e1628] border border-cyan-900/40 space-y-2">
                  <h4 className="text-sm font-semibold text-white font-heading">Vital Threshold Limits</h4>
                  <p className="text-xs text-slate-400">Heart rate critical cutoff: 120 BPM</p>
                  <p className="text-xs text-slate-400">SpO2 critical cutoff: 93.0%</p>
                  <p className="text-xs text-slate-400">Core temperature threshold: 38.2°C</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1628] border border-cyan-900/40 space-y-2">
                  <h4 className="text-sm font-semibold text-white font-heading">FastAPI / Supabase Link</h4>
                  <p className="text-xs text-slate-400">Endpoint: http://localhost:8000/telemetry</p>
                  <p className="text-xs text-slate-400">Sync Frequency: Every 25 seconds</p>
                  <p className="text-xs text-emerald-400 font-mono">Status: {backendStatus.online ? 'Online' : 'Demo Local Mode'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Help & Support */}
        {currentTab === 'help' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    FLIGHT SURGEON PROTOCOLS & SUPPORT
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Operational procedures for Deep Space bio-telemetry telemetry incidents
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
                <div className="p-4 rounded-xl bg-[#0e1628] border border-cyan-900/40">
                  <h4 className="text-sm font-bold text-cyan-300 font-heading mb-1">
                    1. Telemetry Ingestion via FastAPI
                  </h4>
                  <p>
                    All biometric values are transmitted through secure REST endpoints. If the backend is offline, the client automatically defaults to verified offline simulations with zero disruption to mission operations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1628] border border-cyan-900/40">
                  <h4 className="text-sm font-bold text-cyan-300 font-heading mb-1">
                    2. Emergency Tachycardia / Hypoxia Workflow
                  </h4>
                  <p>
                    Any reading exceeding 120 BPM or dropping below 93% SpO2 immediately updates the astronaut's status to CRITICAL, triggering red visual alerts on both the Astronaut Portal and Mission Control Roster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Telemetry Injection Modal */}
      <TelemetryModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        onTelemetrySubmitted={handleTelemetrySubmitted}
        astronauts={astronauts}
      />

      {/* Futuristic Space Mission Footer */}
      <footer
        className="border-t border-cyan-950/60 bg-[#04060b]/90 py-4 px-4 sm:px-6 text-xs font-mono text-slate-500"
        style={{
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-slate-400">ASTRA HEALTH BIO-TELEMETRY CONSOLE</span>
            <span>&bull;</span>
            <span>NASA OPEN SCIENCE ARCHITECTURE</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECURE REST-V1 &bull; FASTAPI + SUPABASE
          </div>
        </div>
      </footer>
    </div>
  );
}
