import React, { useState } from 'react';
import { X, Send, Heart, Wind, Thermometer, User, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

export default function TelemetryModal({ isOpen, onClose, onTelemetrySubmitted, astronauts = [] }) {
  const [astronautId, setAstronautId] = useState('AST-001');
  const [heartRate, setHeartRate] = useState('74');
  const [oxygenLevel, setOxygenLevel] = useState('98.4');
  const [bodyTemp, setBodyTemp] = useState('36.6');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      astronaut_id: astronautId,
      heart_rate: parseFloat(heartRate),
      oxygen_level: parseFloat(oxygenLevel),
      body_temperature: parseFloat(bodyTemp),
    };

    if (isNaN(payload.heart_rate) || payload.heart_rate <= 0) {
      setError('Please provide a valid positive heart rate.');
      setLoading(false);
      return;
    }

    if (isNaN(payload.oxygen_level) || payload.oxygen_level < 0 || payload.oxygen_level > 100) {
      setError('SpO2 Oxygen level must be between 0% and 100%.');
      setLoading(false);
      return;
    }

    if (isNaN(payload.body_temperature) || payload.body_temperature <= 0) {
      setError('Please provide a valid body temperature.');
      setLoading(false);
      return;
    }

    const res = await api.postTelemetry(payload);
    setLoading(false);

    if (res.success) {
      setResult({
        message: 'Telemetry packet successfully transmitted and saved to Supabase!',
        data: res.data
      });
      if (onTelemetrySubmitted) {
        onTelemetrySubmitted(payload);
      }
    } else {
      setError(res.error || 'Failed to transmit telemetry to backend.');
    }
  };

  const handlePreset = (type) => {
    if (type === 'nominal') {
      setHeartRate('72.0');
      setOxygenLevel('98.5');
      setBodyTemp('36.6');
    } else if (type === 'exercise') {
      setHeartRate('142.0');
      setOxygenLevel('97.6');
      setBodyTemp('37.4');
    } else if (type === 'warning') {
      setHeartRate('104.0');
      setOxygenLevel('93.8');
      setBodyTemp('37.9');
    } else if (type === 'critical') {
      setHeartRate('128.0');
      setOxygenLevel('91.2');
      setBodyTemp('38.7');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-[#0c1222] border border-cyan-500/40 rounded-2xl shadow-2xl glow-cyan overflow-hidden my-auto max-h-[92vh] flex flex-col"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/40 bg-gradient-to-r from-cyan-950/40 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                TRANSMIT TELEMETRY PACKET
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                TARGET: FASTAPI BACKEND &bull; POST /telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Rapid Biometric Presets
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handlePreset('nominal')}
                className="py-1 px-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              >
                Nominal
              </button>
              <button
                type="button"
                onClick={() => handlePreset('exercise')}
                className="py-1 px-2 rounded bg-blue-950/40 border border-blue-500/40 text-blue-300 hover:bg-blue-900/60 transition-colors"
              >
                Exercise
              </button>
              <button
                type="button"
                onClick={() => handlePreset('warning')}
                className="py-1 px-2 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-colors"
              >
                Warning
              </button>
              <button
                type="button"
                onClick={() => handlePreset('critical')}
                className="py-1 px-2 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-colors"
              >
                Critical
              </button>
            </div>
          </div>

          {/* Astronaut Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Astronaut Identifier
            </label>
            <div className="relative">
              <select
                value={astronautId}
                onChange={(e) => setAstronautId(e.target.value)}
                className="w-full bg-[#131b2e] border border-cyan-900/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              >
                {astronauts.map((astro) => (
                  <option key={astro.id} value={astro.id}>
                    {astro.id} - {astro.name} ({astro.callsign})
                  </option>
                ))}
                <option value="AST-007">AST-007 - Custom Telemetry Beacon</option>
              </select>
            </div>
          </div>

          {/* Biometrics Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Heart Rate */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-rose-300 mb-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Heart Rate (BPM)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="75"
                className="w-full bg-[#131b2e] border border-cyan-900/60 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Oxygen Level */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-300 mb-1">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                SpO2 Saturation (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                required
                value={oxygenLevel}
                onChange={(e) => setOxygenLevel(e.target.value)}
                placeholder="98.5"
                className="w-full bg-[#131b2e] border border-cyan-900/60 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Body Temperature */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-300 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                Core Temp (°C)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={bodyTemp}
                onChange={(e) => setBodyTemp(e.target.value)}
                placeholder="36.6"
                className="w-full bg-[#131b2e] border border-cyan-900/60 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Feedback & Notifications */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Transmission Failed</p>
                <p className="text-rose-300/80">{error}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  (Note: Check if backend server is running on http://127.0.0.1:8000)
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{result.message}</p>
                <p className="text-emerald-300/80">
                  Transmitted to: {astronautId} &bull; HR: {heartRate} BPM &bull; SpO2: {oxygenLevel}% &bull; Temp: {bodyTemp}°C
                </p>
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg shadow-cyan-900/40 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Transmit to Backend
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
