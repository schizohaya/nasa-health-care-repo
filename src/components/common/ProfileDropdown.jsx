import React, { useEffect, useRef } from 'react';
import {
  User,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Activity,
  Award,
  Clock,
  ExternalLink,
  LogOut,
  RefreshCw,
  Bell
} from 'lucide-react';

export default function ProfileDropdown({
  isOpen,
  onClose,
  user,
  onSwitchRole,
  onViewProfile,
  onOpenTelemetryModal
}) {
  const dropdownRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-88 rounded-2xl bg-[#090f1f]/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl z-50 p-4 text-slate-100 animate-fadeIn"
      style={{
        maxWidth: 'calc(100vw - 24px)'
      }}
    >
      {/* User Header */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-cyan-950/70">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-900/40 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-heading text-lg font-bold shadow-lg shadow-cyan-950/50 shrink-0">
            {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090f1f] rounded-full" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-sm font-bold text-white font-heading truncate">
              {user.name}
            </h4>
            <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40 rounded">
              {user.id}
            </span>
          </div>
          <p className="text-xs text-cyan-300/90 font-medium truncate mt-0.5">
            {user.role}
          </p>
          <p className="text-[10px] font-mono text-slate-400 truncate">
            {user.organization || 'NASA Human Research Program'}
          </p>
        </div>
      </div>

      {/* Role Switcher Pill */}
      <div className="mt-3 p-2.5 rounded-xl bg-[#0d152a] border border-cyan-900/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Active Station Role
          </span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CLEARANCE LVL-3
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 bg-[#060a14] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onSwitchRole('Astronaut')}
            className={`px-2 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              user.roleCategory === 'Astronaut'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Astronaut
          </button>
          <button
            onClick={() => onSwitchRole('Facility Staff')}
            className={`px-2 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              user.roleCategory === 'Facility Staff'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Facility Staff
          </button>
        </div>
      </div>

      {/* Profile Metrics Snapshot */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2 rounded-lg bg-[#0c1326] border border-slate-800">
          <span className="text-slate-400 block text-[10px]">CURRENT MISSION</span>
          <span className="text-cyan-300 font-semibold truncate block mt-0.5">
            {user.mission || 'Artemis V'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-[#0c1326] border border-slate-800">
          <span className="text-slate-400 block text-[10px]">MISSION ELAPSED</span>
          <span className="text-amber-300 font-semibold block mt-0.5">
            +142 DAYS
          </span>
        </div>
      </div>

      {/* Action links */}
      <div className="mt-3 pt-2 border-t border-cyan-950/70 space-y-1">
        <button
          onClick={() => {
            onViewProfile();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121c33] transition-colors"
        >
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Open Astronaut Medical File</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => {
            onOpenTelemetryModal();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#121c33] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Transmit Medical Telemetry</span>
          </span>
          <span className="text-[10px] font-mono text-cyan-400">FASTAPI</span>
        </button>
      </div>

      {/* Sign out / status */}
      <div className="mt-3 pt-2 border-t border-cyan-950/70 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          SESSION AUTH: ACTIVE
        </span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-rose-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
