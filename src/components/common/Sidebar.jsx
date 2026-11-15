import React, { useEffect } from 'react';
import {
  X,
  Activity,
  User,
  LayoutDashboard,
  Globe,
  History,
  Bell,
  Settings,
  HelpCircle,
  ShieldCheck,
  Satellite,
  ChevronRight,
  Radio,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  activeUser,
  backendStatus = {},
  telemetryCount = 0
}) {
  // Close sidebar on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    {
      id: 'mission-control',
      label: 'Dashboard',
      sublabel: 'Crew Roster & Overview',
      icon: LayoutDashboard,
      badge: 'MAIN',
      color: 'text-blue-400'
    },
    {
      id: 'astronaut',
      label: 'My Health / Astronaut Portal',
      sublabel: 'Biometrics & Daily Readiness',
      icon: User,
      color: 'text-cyan-400'
    },
    {
      id: 'mission-control',
      label: 'Mission Control',
      sublabel: 'Real-Time Facility Operations',
      icon: Radio,
      color: 'text-emerald-400'
    },
    {
      id: 'nasa-data',
      label: 'NASA Data',
      sublabel: 'Open Science & Space Weather',
      icon: Globe,
      badge: 'ARCHIVE',
      color: 'text-indigo-400'
    },
    {
      id: 'history',
      label: 'Health History',
      sublabel: 'Cumulative Telemetry & Logs',
      icon: History,
      color: 'text-amber-400'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      sublabel: 'Medical & Hazard Thresholds',
      icon: Bell,
      badge: 'LIVE',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      color: 'text-rose-400'
    },
    {
      id: 'settings',
      label: 'Settings',
      sublabel: 'Telemetry Units & Thresholds',
      icon: Settings,
      color: 'text-slate-400'
    },
    {
      id: 'help',
      label: 'Help & Support',
      sublabel: 'Flight Surgeon Protocol Docs',
      icon: HelpCircle,
      color: 'text-slate-400'
    }
  ];

  const handleNavClick = (tabId) => {
    onSelectTab(tabId);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sliding Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[85vw] max-w-[340px] bg-[#070b14] border-r border-cyan-900/40 shadow-2xl shadow-cyan-950/80 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
        aria-label="Sidebar navigation"
      >
        {/* Branding header */}
        <div className="p-5 border-b border-cyan-950/60 bg-gradient-to-b from-[#0b1222] to-[#070b14]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 glow-cyan shrink-0">
                <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-wider text-white font-heading">
                    ASTRA<span className="text-cyan-400">HEALTH</span>
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono tracking-widest uppercase bg-blue-900/60 text-blue-300 border border-blue-600/40 rounded">
                    NASA
                  </span>
                </div>
                <p className="text-[10px] tracking-wide text-slate-400 font-mono">
                  BIO-TELEMETRY & MISSION CONTROL
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini badge */}
          {activeUser && (
            <div className="mt-4 p-2.5 rounded-lg bg-[#0e1628]/80 border border-cyan-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-heading font-bold flex items-center justify-center shrink-0">
                  {activeUser.name.charAt(0)}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">{activeUser.name}</p>
                  <p className="text-[10px] font-mono text-cyan-300/80 truncate">{activeUser.role}</p>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                {activeUser.role.includes('Astronaut') ? 'CREW' : 'STAFF'}
              </span>
            </div>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Mission Navigation
          </div>

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            // Check active state
            const isActive = currentTab === item.id;

            return (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all group ${
                  isActive
                    ? 'bg-cyan-500/15 text-white border border-cyan-500/40 glow-cyan'
                    : 'text-slate-300 hover:bg-[#0f172a]/70 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg bg-black/40 border border-slate-800 group-hover:border-slate-700 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium tracking-wide truncate">
                      {item.label}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${
                      item.badgeColor || 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-300'
                  }`} />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-cyan-950/60 bg-[#050811] text-[11px] font-mono space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Satellite className="w-3 h-3 text-cyan-400" />
              <span>ORBIT: NRHO L2</span>
            </span>
            <span className="text-emerald-400">
              {backendStatus.online ? 'SYNC: OK' : 'LOCAL SIM'}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>TELEMETRY RECS</span>
            <span className="text-cyan-300">{telemetryCount}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
