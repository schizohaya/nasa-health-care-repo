import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Radio, 
  Globe, 
  Send, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Satellite,
  User,
  LayoutDashboard
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  backendStatus, 
  onRefreshBackend, 
  onOpenTelemetryModal,
  telemetryCount = 0
}) {
  const [utcTime, setUtcTime] = useState('');
  const [metTime, setMetTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
      
      // Simulated Mission Elapsed Time: MET +142d 08h 24m 10s
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setMetTime(`MET +142d ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-900/30 bg-[#060912]/90 backdrop-blur-md">
      {/* Top micro-bar: Space Agency Mission Telemetry Header */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-black/60 text-[11px] font-mono text-slate-400 border-b border-cyan-950/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Satellite className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '16s' }} />
            NASA BIO-ASTRONAUTICS NETWORK &bull; DEEP SPACE GATEWAY DSN-24
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">ORBIT: NRHO-LUNAR L2</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">LINK: 8.4 GHz X-BAND NOMINAL</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-cyan-300 font-semibold">{utcTime}</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300">{metTime}</span>
          <span className="text-slate-500">|</span>
          
          {/* Backend Connectivity Status */}
          <div className="flex items-center gap-2">
            {backendStatus.online ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                BACKEND: ONLINE (FASTAPI / SUPABASE) [{telemetryCount} RECS]
              </span>
            ) : (
              <button 
                onClick={onRefreshBackend}
                title="Click to re-check FastAPI backend"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                DEMO MODE (BACKEND UNREACHABLE)
                <RefreshCw className="w-2.5 h-2.5 ml-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 glow-cyan">
              <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-75" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wider text-white font-heading">
                  ASTRA<span className="text-cyan-400">HEALTH</span>
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-mono tracking-widest uppercase bg-blue-900/60 text-blue-300 border border-blue-600/40 rounded">
                  NASA
                </span>
              </div>
              <p className="text-[10px] tracking-wide text-slate-400 font-mono hidden sm:block">
                ASTRONAUT HEALTH MONITORING & MISSION CONTROL
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentTab('astronaut')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'astronaut'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>Astronaut Portal</span>
            </button>

            <button
              onClick={() => setCurrentTab('mission-control')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'mission-control'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Mission Control</span>
            </button>

            <button
              onClick={() => setCurrentTab('nasa-data')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'nasa-data'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">NASA Data & Science</span>
              <span className="sm:hidden">NASA</span>
            </button>
          </nav>

          {/* Quick Action Button: Inject / Transmit Telemetry */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTelemetryModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50 border border-cyan-400/40 hover:glow-cyan transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Log Telemetry</span>
              <span className="md:hidden">Log</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
