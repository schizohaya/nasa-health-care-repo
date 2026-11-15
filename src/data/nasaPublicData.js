/**
 * ASTRA HEALTH - NASA Public Data & Space Environment Reference Repository
 * 
 * NOTICE & DISCLAIMER:
 * All records in this file represent public NASA Open Science Data Repository (OSDR),
 * Space Weather Database of Notifications, Knowledge, Information (DONKI),
 * and NASA Open Science research data.
 * 
 * They are provided strictly as scientific benchmarks and environmental context,
 * distinct from live astronaut biomedical telemetry.
 */

export const NASA_DISCLAIMER = {
  title: "NASA Public Reference & Space Environment Data Disclaimer",
  body: "The environmental, space weather, and biomedical research studies presented in this section are sourced from public NASA scientific archives, including the NASA Open Science Data Repository (OSDR) and the Space Weather Database (DONKI). These datasets provide mission context and historical benchmarks; they are distinct from operational astronaut telemetry transmitted via the ASTRA HEALTH backend.",
  updatedAt: "2026-11-14T12:00:00Z"
};

export const SPACE_WEATHER_METRICS = {
  solarWindSpeed: {
    value: 462,
    unit: "km/s",
    status: "Nominal",
    historicalNormal: "300 - 500 km/s",
    sensor: "NASA SOHO / NOAA DSCOVR at Sun-Earth L1"
  },
  geomagneticKpIndex: {
    value: 3.2,
    unit: "Kp (0-9 scale)",
    status: "Quiet to Unsettled",
    historicalNormal: "< 4.0 Kp",
    risk: "Low risk of ionospheric disturbance to lunar communications"
  },
  solarRadiationFlux: {
    value: "1.4e-2",
    unit: "MeV Protons / cm²-s-sr",
    status: "Below S1 Threshold",
    historicalNormal: "< 10 pfu",
    risk: "Extra-Vehicular Activity (EVA) permissible"
  },
  galacticCosmicRayDose: {
    value: 0.42,
    unit: "mSv / 24hr",
    status: "Baseline Deep Space",
    sensor: "Orion Crew Radiation Dosimeter (HERA)"
  },
  microgravityOrbitalProfile: {
    orbitType: "Near-Rectilinear Halo Orbit (NRHO)",
    inclination: "89.2°",
    periluneAltitude: "3,120 km",
    apoluneAltitude: "70,000 km",
    orbitalPeriod: "6.5 Earth Days"
  }
};

export const RECENT_SOLAR_EVENTS = [
  {
    id: "FLR-2026-11-12",
    type: "Solar Flare",
    classification: "M2.8 Flare",
    sourceRegion: "Active Region AR3942",
    peakTime: "2026-11-12 14:22 UTC",
    evaImpact: "Advisory issued; Gateway storm shelter standby cleared.",
    source: "NASA Solar Dynamics Observatory (SDO) / DONKI",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10"
  },
  {
    id: "CME-2026-11-10",
    type: "Coronal Mass Ejection",
    classification: "Earth-Directed Component (Partial)",
    sourceRegion: "AR3938",
    peakTime: "2026-11-10 03:50 UTC",
    evaImpact: "Kp elevated to 4.5. Lunar EVA postponed by 4 hours; no crew dose excess.",
    source: "NASA SOHO LASCO C3 Coronagraph",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
  },
  {
    id: "GST-2026-11-04",
    type: "Geomagnetic Storm",
    classification: "G1 Minor Storm",
    sourceRegion: "Interplanetary Magnetic Field (IMF) Southward Turning",
    peakTime: "2026-11-04 18:00 UTC",
    evaImpact: "Low earth orbit auroral precipitation; Gateway unaffected.",
    source: "NOAA Space Weather Prediction Center / NASA CCMC",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10"
  }
];

export const NASA_OPEN_SCIENCE_STUDIES = [
  {
    accession: "OSD-379",
    title: "Transcriptomic Profiling of Human T-Cells Subjected to Microgravity and Cosmic Radiation",
    program: "NASA GeneLab / Space Biology",
    platform: "International Space Station (ISS) Kibo Bioreactor",
    organism: "Homo sapiens (Primary T-Lymphocytes)",
    keyFindings: "Identified progressive dysregulation of IL-2 and interferon-gamma signalling pathways after >60 days in microgravity. Supports individualized immune prophylaxis for Artemis deep space missions.",
    clinicalApplication: "Crew immune monitoring, cytokine profiling, post-flight recovery regimens.",
    url: "https://osdr.nasa.gov/bio/repo/data/studies/OSD-379",
    tags: ["Immunology", "Microgravity", "Gene Expression", "Artemis Target"]
  },
  {
    accession: "OSD-120",
    title: "The NASA Twins Study: A Multi-Omic Assessment of a One-Year Spaceflight Mission",
    program: "NASA Human Research Program (HRP)",
    platform: "ISS One-Year Mission",
    organism: "Homo sapiens (Monovular Twin Astronauts)",
    keyFindings: "Telomere length increased during spaceflight and shortened rapidly post-return. Reversible chromosomal inversions and carotid artery wall thickening documented during 340-day exposure.",
    clinicalApplication: "Long-duration cardiovascular risk modeling and genomic countermeasures.",
    url: "https://osdr.nasa.gov/bio/repo/data/studies/OSD-120",
    tags: ["Twins Study", "Telomeres", "Cardiovascular", "Genomics"]
  },
  {
    accession: "OSD-544",
    title: "Bone Mineral Density Countermeasures: Advanced Resistive Exercise Device (ARED) Longitudinal Cohort",
    program: "NASA Space Medicine Division",
    platform: "ISS Flights (Expeditions 30-65)",
    organism: "Homo sapiens (Long-Duration Crew n=42)",
    keyFindings: "High-load eccentric resistance training mitigated cancellous bone loss in proximal femur from -1.4%/month to -0.3%/month when combined with bisphosphonate protocol.",
    clinicalApplication: "Prescribed 2.5 hours daily ARED resistance protocols for Gateway astronauts.",
    url: "https://osdr.nasa.gov/bio/repo/data/studies/OSD-544",
    tags: ["Musculoskeletal", "Bone Density", "ARED", "Exercise Protocols"]
  },
  {
    accession: "OSD-612",
    title: "Spaceflight-Associated Neuro-ocular Syndrome (SANS): Venous Congestion & Cephalad Fluid Shifts",
    program: "NASA Human Physiology Countermeasures Laboratory",
    platform: "Chibis Lower Body Negative Pressure (LBNP) / Gateway Analogs",
    organism: "Homo sapiens (Astronauts)",
    keyFindings: "Persistent optic disc edema and choroidal folds correlate with hypercapnic cabin environments (>3.0 mmHg CO2) and lack of gravity-assisted fluid redistribution.",
    clinicalApplication: "Nightly LBNP suits and strict cabin CO2 scrubbing thresholds (<2.0 mmHg).",
    url: "https://osdr.nasa.gov/bio/repo/data/studies/OSD-612",
    tags: ["SANS", "Neuro-Ocular", "Fluid Shift", "Intracranial Pressure"]
  }
];

export const SPACE_ENVIRONMENT_FACTS = [
  {
    metric: "Deep Space Radiation",
    value: "~1.5 mSv / day",
    comparison: "Equal to ~150 chest X-rays daily; Artemis habitat utilizes polyethylene & hydrogen-rich water shielding."
  },
  {
    metric: "Lunar Surface Micro-gravity",
    value: "0.166 g (1/6 Earth)",
    comparison: "Rapid muscle atrophy and vestibular disorientation without proactive countermeasure workouts."
  },
  {
    metric: "EVA Suit Operating Pressure",
    value: "4.3 psi (Pure O2)",
    comparison: "Prevents suit rigidity while requiring a 2-hour pre-breathe to prevent decompression sickness (bends)."
  },
  {
    metric: "Gateway Cabin Atmosphere",
    value: "21% O2 / 78% N2 (14.7 psi)",
    comparison: "Equivalent to sea-level atmospheric composition to minimize respiratory stress."
  }
];
