import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/common/Header';
import AstronautPortal from './components/astronaut/AstronautPortal';
import MissionControlDashboard from './components/mission-control/MissionControlDashboard';
import NasaDataSection from './components/nasa/NasaDataSection';
import TelemetryModal from './components/common/TelemetryModal';
import { INITIAL_ASTRONAUTS } from './data/mockAstronauts';
import { api } from './services/api';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('mission-control'); // 'mission-control' | 'astronaut' | 'nasa-data'
  const [astronauts, setAstronauts] = useState(INITIAL_ASTRONAUTS);
  const [selectedAstronautId, setSelectedAstronautId] = useState('AST-001');
  
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
        // Find most recent matching record for this astronaut
        const matchingRecords = records.filter(r => r.astronaut_id === astro.id);
        if (matchingRecords.length === 0) return astro;

        // Latest record is at the end or has highest id
        const latest = matchingRecords[matchingRecords.length - 1];

        // Determine status based on thresholds
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

        // Add to historical list if not duplicate
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
    
    // Check GET /health
    const health = await api.checkHealth();
    setBackendStatus({ online: health.online, checking: false });

    if (health.online) {
      // Check GET /telemetry
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
    // Show toast
    setToastMessage({
      type: 'success',
      text: `Telemetry packet for ${payload.astronaut_id} successfully sent to backend!`
    });
    setTimeout(() => setToastMessage(null), 5000);

    // Refresh immediately to pull newest Supabase record
    await refreshBackend();
  };

  // Find currently selected astronaut for Astronaut Portal
  const activeAstronaut = astronauts.find(a => a.id === selectedAstronautId) || astronauts[0];

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col space-grid">
      {/* Header with Navigation and System Status */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        backendStatus={backendStatus}
        onRefreshBackend={refreshBackend}
        onOpenTelemetryModal={() => setIsTelemetryModalOpen(true)}
        telemetryCount={liveTelemetryList.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Optional Toast Notification */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{toastMessage.text}</span>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white"
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

      </main>

      {/* Telemetry Injection Modal */}
      <TelemetryModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        onTelemetrySubmitted={handleTelemetrySubmitted}
        astronauts={astronauts}
      />

      {/* Futuristic Space Mission Footer */}
      <footer className="border-t border-cyan-950/60 bg-[#04060b]/90 py-4 px-6 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">ASTRA HEALTH BIO-TELEMETRY CONSOLE</span>
            <span>&bull;</span>
            <span>NASA OPEN SCIENCE & FASTAPI ARCHITECTURE</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECURE REST-V1 INTEGRATION &bull; SUPABASE MANAGED VIA BACKEND
          </div>
        </div>
      </footer>
    </div>
  );
}
