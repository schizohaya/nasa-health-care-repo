import React, { useState } from 'react';
import { 
  Globe, 
  Sun, 
  Radio, 
  Database, 
  ExternalLink, 
  Orbit
} from 'lucide-react';
import { 
  NASA_DISCLAIMER, 
  SPACE_WEATHER_METRICS, 
  RECENT_SOLAR_EVENTS, 
  NASA_OPEN_SCIENCE_STUDIES, 
  SPACE_ENVIRONMENT_FACTS 
} from '../../data/nasaPublicData';

export default function NasaDataSection() {
  const [selectedTag, setSelectedTag] = useState('ALL');

  const allTags = ['ALL', 'Immunology', 'Microgravity', 'Twins Study', 'Cardiovascular', 'Bone Density', 'SANS', 'Neuro-Ocular'];

  const filteredStudies = NASA_OPEN_SCIENCE_STUDIES.filter(study => {
    if (selectedTag === 'ALL') return true;
    return study.tags.includes(selectedTag);
  });

  return (
    <div className="space-y-8">
      {/* 1. MANDATORY NASA PUBLIC DATA DISCLAIMER & DISTINCTION BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0a1224] to-cyan-950/60 border-2 border-cyan-500/50 p-6 glow-cyan">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 shrink-0 mt-1">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-cyan-900/60 text-cyan-300 border border-cyan-400/40">
                OFFICIAL NASA OPEN SCIENCE & SPACE WEATHER ARCHIVE
              </span>
              <span className="text-xs font-mono text-slate-400">
                PUBLIC DOMAIN REFERENCE
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              NASA DATA & SPACE ENVIRONMENT REPOSITORY
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
              {NASA_DISCLAIMER.body}
            </p>

            {/* Three-Tier Data Classification Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-cyan-900/40 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/40 text-blue-200">
                <span className="font-bold block text-blue-300 uppercase">1. NASA Public Reference</span>
                <p className="text-[11px] text-blue-200/80 mt-0.5">Open science research, OSDR genomic studies & DONKI space weather telemetry.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                <span className="font-bold block text-emerald-300 uppercase">2. Backend Astronaut Telemetry</span>
                <p className="text-[11px] text-emerald-200/80 mt-0.5">Live database telemetry transmitted from FastAPI & Supabase tables.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-200">
                <span className="font-bold block text-purple-300 uppercase">3. Simulated Demo Data</span>
                <p className="text-[11px] text-purple-200/80 mt-0.5">Realistic physiological baseline simulations for crew members when offline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NASA SPACE WEATHER & ENVIRONMENT MONITORING */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '40s' }} />
            <h3 className="text-lg font-bold text-white font-heading">
              NASA SPACE WEATHER & HELIOPHYSICS OBSERVATORY
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            SOURCE: NOAA SWPC &bull; NASA SDO / SOHO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Solar Wind */}
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-amber-500/30 shadow-lg">
            <span className="text-xs font-mono uppercase text-amber-300/80 block mb-1">
              Solar Wind Speed
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold font-heading text-white">
                {SPACE_WEATHER_METRICS.solarWindSpeed.value}
              </span>
              <span className="text-xs font-mono text-amber-400">
                {SPACE_WEATHER_METRICS.solarWindSpeed.unit}
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
              <p>Status: <strong className="text-emerald-400">{SPACE_WEATHER_METRICS.solarWindSpeed.status}</strong></p>
              <p className="text-[10px] text-slate-500">{SPACE_WEATHER_METRICS.solarWindSpeed.sensor}</p>
            </div>
          </div>

          {/* Geomagnetic Kp Index */}
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-cyan-500/30 shadow-lg">
            <span className="text-xs font-mono uppercase text-cyan-300/80 block mb-1">
              Geomagnetic Kp Index
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold font-heading text-white">
                {SPACE_WEATHER_METRICS.geomagneticKpIndex.value}
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Kp
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
              <p>State: <strong className="text-cyan-300">{SPACE_WEATHER_METRICS.geomagneticKpIndex.status}</strong></p>
              <p className="text-[10px] text-slate-500">{SPACE_WEATHER_METRICS.geomagneticKpIndex.risk}</p>
            </div>
          </div>

          {/* Proton / Solar Radiation Flux */}
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-blue-500/30 shadow-lg">
            <span className="text-xs font-mono uppercase text-blue-300/80 block mb-1">
              Solar Proton Flux
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold font-heading text-white">
                {SPACE_WEATHER_METRICS.solarRadiationFlux.value}
              </span>
              <span className="text-xs font-mono text-blue-400">
                pfu
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
              <p>Status: <strong className="text-emerald-400">{SPACE_WEATHER_METRICS.solarRadiationFlux.status}</strong></p>
              <p className="text-[10px] text-slate-500">{SPACE_WEATHER_METRICS.solarRadiationFlux.risk}</p>
            </div>
          </div>

          {/* Cosmic Ray Dose Rate */}
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-purple-500/30 shadow-lg">
            <span className="text-xs font-mono uppercase text-purple-300/80 block mb-1">
              Cosmic Ray (GCR) Daily Rate
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold font-heading text-white">
                {SPACE_WEATHER_METRICS.galacticCosmicRayDose.value}
              </span>
              <span className="text-xs font-mono text-purple-400">
                mSv / 24h
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
              <p>Environment: <strong className="text-purple-300">Lunar Gateway Halo</strong></p>
              <p className="text-[10px] text-slate-500">{SPACE_WEATHER_METRICS.galacticCosmicRayDose.sensor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT SOLAR FLARE & GEOMAGNETIC STORM EVENTS (DONKI) */}
      <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              NASA DONKI SPACE WEATHER NOTIFICATIONS (SOLAR FLARES & CMES)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            OFFICIAL DONKI FEED
          </span>
        </div>

        <div className="space-y-3">
          {RECENT_SOLAR_EVENTS.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-xl bg-[#0e162a] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${event.badgeColor}`}>
                    {event.classification}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{event.type}</span>
                  <span className="text-xs font-mono text-slate-500">&bull;</span>
                  <span className="text-xs font-mono text-slate-400">Region: {event.sourceRegion}</span>
                </div>
                <p className="text-xs text-slate-200 font-sans">
                  <strong className="text-cyan-400 font-mono">Astronaut EVA Impact:</strong> {event.evaImpact}
                </p>
                <p className="text-[10px] font-mono text-slate-500">Source: {event.source}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono text-amber-300 block">{event.peakTime}</span>
                <span className="text-[10px] font-mono text-slate-500">EVENT ID: {event.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. NASA OPEN SCIENCE DATA REPOSITORY (OSDR) - ASTRONAUT HEALTH STUDIES */}
      <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                NASA OPEN SCIENCE DATA REPOSITORY (OSDR) RESEARCH
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Peer-reviewed open datasets on human physiology in microgravity and cosmic radiation
            </p>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-[#121a2d] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Studies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudies.map((study) => (
            <div
              key={study.accession}
              className="p-5 rounded-xl bg-[#0d1424] border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {study.accession}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{study.program}</span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {study.title}
                </h4>

                <div className="text-xs font-mono text-slate-400 mb-3 space-y-0.5">
                  <p><strong className="text-slate-300">Platform:</strong> {study.platform}</p>
                  <p><strong className="text-slate-300">Subject:</strong> {study.organism}</p>
                </div>

                <div className="p-3 rounded-lg bg-[#11192e] border border-slate-800/80 mb-3">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                    Key Scientific Findings:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {study.keyFindings}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {study.tags.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  <span>Inspect on NASA OSDR Bio Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SPACE ENVIRONMENT & BIOMEDICAL COUNTERMEASURES BENCHMARK */}
      <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/40 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Orbit className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white font-heading">
            SPACE ENVIRONMENT & PHYSIOLOGICAL THRESHOLDS REFERENCE
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {SPACE_ENVIRONMENT_FACTS.map((fact, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0e162a] border border-slate-800">
              <span className="text-slate-400 block mb-1 uppercase text-[10px]">{fact.metric}</span>
              <span className="text-xl font-bold font-heading text-cyan-300 block mb-2">{fact.value}</span>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{fact.comparison}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
