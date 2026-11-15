/**
 * ASTRA HEALTH - Astronaut Roster & Baseline Simulated Data
 * Provides realistic medical, biometric, mission, and EVA parameters.
 * When backend data (FastAPI/Supabase) is received, matching records update seamlessly.
 */

export const INITIAL_ASTRONAUTS = [
  {
    id: "AST-001",
    name: "Cmdr. Sarah Chen",
    callsign: "Vanguard",
    role: "Mission Commander & Astrobiologist",
    rank: "NASA Senior Astronaut (GS-15)",
    mission: "Artemis VII — Gateway Lunar Orbit",
    missionDuration: "Day 142 of 180",
    spacecraft: "Deep Space Gateway / Orion-4",
    bloodType: "O-Positive",
    age: 41,
    status: "NORMAL", // NORMAL | WARNING | CRITICAL
    suitId: "EMU-X84",
    currentVitals: {
      heartRate: 72,
      oxygenLevel: 98.4,
      bodyTemperature: 36.6,
      bloodPressure: "118/76",
      respirationRate: 14,
      radiationDose: 0.38, // mSv today
      suitPressure: 4.3, // psi
    },
    dailySummary: {
      readinessScore: 96,
      sleepHours: 7.6,
      sleepEfficiency: "92% (High REM)",
      caloricExpenditure: 2680,
      evaStatus: "Scheduled T-04:20:00",
      flightSurgeonNote: "Cardiovascular response to ARED resistance protocol optimal. Mild circadian drift corrected with blue-light therapy.",
    },
    timeline: [
      { time: "06:00 UTC", title: "Crew Wakeup & Bio-Telemetry Sync", category: "Routine", status: "nominal", desc: "Baseline resting vitals logged. Sleep architecture validated." },
      { time: "07:30 UTC", title: "Nutritional & Hydration Protocol", category: "Nutrition", status: "nominal", desc: "Target 2,800 kcal / 2.5L electrolyte intake initiated." },
      { time: "09:15 UTC", title: "T2 Treadmill / Resistance Training", category: "Exercise", status: "elevated", desc: "HR peaked at 148 BPM during high-intensity interval segment. Normal recovery." },
      { time: "11:45 UTC", title: "Airlock Pre-Breathe Session", category: "EVA Prep", status: "nominal", desc: "Oxygen saturation maintained at 99.1% during hyperbaric denitrogenation." },
      { time: "14:30 UTC", title: "Gateway Core Science Module Maintenance", category: "Operations", status: "nominal", desc: "Ergonomic strain within safe margins." },
      { time: "17:00 UTC", title: "Cognitive Performance & Reaction Test", category: "Neuro", status: "nominal", desc: "Reaction times within 98th percentile of mission baseline." },
      { time: "20:00 UTC", title: "Evening Flight Surgeon Audio Check", category: "Medical", status: "nominal", desc: "No musculoskeletal or vestibular complaints reported." }
    ],
    alerts: [
      { id: "alt-101", timestamp: "09:28 UTC", severity: "info", message: "Peak cardiac workload achieved during T2 resistance interval (148 BPM). Recovery within 2.4 min.", active: false },
      { id: "alt-102", timestamp: "11:50 UTC", severity: "nominal", message: "Denitrogenation pre-breathe protocol completed with 100% compliance.", active: false },
      { id: "alt-103", timestamp: "18:15 UTC", severity: "info", message: "Daily radiation dosimeter logged 0.38 mSv (Nominal GCR solar quiet).", active: true }
    ],
    // 24-hour hourly trend readings
    hourlyReadings: [
      { time: "00:00", heartRate: 58, oxygenLevel: 98.8, bodyTemperature: 36.4, activity: "Sleep" },
      { time: "02:00", heartRate: 56, oxygenLevel: 98.7, bodyTemperature: 36.3, activity: "Sleep" },
      { time: "04:00", heartRate: 57, oxygenLevel: 98.9, bodyTemperature: 36.3, activity: "Sleep" },
      { time: "06:00", heartRate: 64, oxygenLevel: 98.5, bodyTemperature: 36.5, activity: "Awake" },
      { time: "08:00", heartRate: 74, oxygenLevel: 98.4, bodyTemperature: 36.7, activity: "Breakfast" },
      { time: "09:00", heartRate: 138, oxygenLevel: 97.8, bodyTemperature: 37.4, activity: "ARED Exercise" },
      { time: "10:00", heartRate: 85, oxygenLevel: 98.6, bodyTemperature: 37.1, activity: "Cool Down" },
      { time: "11:00", heartRate: 72, oxygenLevel: 99.1, bodyTemperature: 36.7, activity: "EVA Pre-Breathe" },
      { time: "12:00", heartRate: 70, oxygenLevel: 99.0, bodyTemperature: 36.6, activity: "Lunch" },
      { time: "14:00", heartRate: 76, oxygenLevel: 98.2, bodyTemperature: 36.8, activity: "Module Ops" },
      { time: "16:00", heartRate: 78, oxygenLevel: 98.3, bodyTemperature: 36.8, activity: "Science Lab" },
      { time: "18:00", heartRate: 73, oxygenLevel: 98.5, bodyTemperature: 36.7, activity: "Log Review" },
      { time: "20:00", heartRate: 68, oxygenLevel: 98.6, bodyTemperature: 36.5, activity: "Comms" },
      { time: "22:00", heartRate: 62, oxygenLevel: 98.8, bodyTemperature: 36.4, activity: "Wind Down" },
    ],
    history: [
      { id: "h-1", timestamp: "Today 16:30 UTC", heartRate: 74, oxygenLevel: 98.4, bodyTemperature: 36.6, status: "Normal", notes: "Routine hourly auto-sample" },
      { id: "h-2", timestamp: "Today 15:30 UTC", heartRate: 76, oxygenLevel: 98.3, bodyTemperature: 36.7, status: "Normal", notes: "Laboratory bio-rack checks" },
      { id: "h-3", timestamp: "Today 14:30 UTC", heartRate: 78, oxygenLevel: 98.2, bodyTemperature: 36.8, status: "Normal", notes: "Station telemetry nominal" },
      { id: "h-4", timestamp: "Today 09:30 UTC", heartRate: 135, oxygenLevel: 97.9, bodyTemperature: 37.4, status: "Elevated", notes: "Scheduled heavy resistance" },
      { id: "h-5", timestamp: "Yesterday 21:00 UTC", heartRate: 65, oxygenLevel: 98.6, bodyTemperature: 36.5, status: "Normal", notes: "Pre-sleep telemetry sync" },
    ]
  },

  {
    id: "AST-002",
    name: "Dr. Marcus Vance",
    callsign: "Aegis",
    role: "Chief Medical Officer / EVA Specialist",
    rank: "NASA Flight Surgeon / Astronaut",
    mission: "Artemis VII — Gateway Lunar Orbit",
    missionDuration: "Day 142 of 180",
    spacecraft: "Deep Space Gateway / Orion-4",
    bloodType: "A-Positive",
    age: 46,
    status: "WARNING",
    suitId: "EMU-X82",
    currentVitals: {
      heartRate: 98,
      oxygenLevel: 94.2,
      bodyTemperature: 37.6,
      bloodPressure: "138/88",
      respirationRate: 20,
      radiationDose: 0.44,
      suitPressure: 4.1,
    },
    dailySummary: {
      readinessScore: 78,
      sleepHours: 5.2,
      sleepEfficiency: "71% (Fragmented)",
      caloricExpenditure: 3150,
      evaStatus: "EVA Standby — Pending Medical Clearance",
      flightSurgeonNote: "Persistent resting tachycardia and sub-optimal SpO2 (94.2%) observed following metabolic chamber calibration. Recommend active hydration and 30-min supplementary O2.",
    },
    timeline: [
      { time: "05:45 UTC", title: "Early Awakening — Mild Headache Noted", category: "Medical", status: "warning", desc: "Reported mild frontal headache, CO2 scrubbers checked nominal." },
      { time: "08:00 UTC", title: "Gateway Life Support Calibration", category: "Operations", status: "nominal", desc: "Serviced ECLSS water reclamation pump assembly." },
      { time: "11:30 UTC", title: "Cardiorespiratory Stress Test", category: "Medical", status: "warning", desc: "Sub-nominal SpO2 recovery curve (94.2%). Heart rate elevated to 112 BPM." },
      { time: "13:45 UTC", title: "Supplementary O2 Delivery Initiated", category: "Intervention", status: "warning", desc: "Administered 2L/min normobaric oxygen via crew helmet." },
      { time: "16:00 UTC", title: "Ultrasound SANS (Optic Nerve) Check", category: "Neuro", status: "nominal", desc: "Optic nerve sheath diameter 5.1mm (within permissible mission limits)." }
    ],
    alerts: [
      { id: "alt-201", timestamp: "11:32 UTC", severity: "warning", message: "SpO2 dropped below 95.0% threshold (94.2%) during post-exertion recovery.", active: true },
      { id: "alt-202", timestamp: "11:45 UTC", severity: "warning", message: "Resting heart rate remains elevated > 95 BPM for over 45 consecutive minutes.", active: true },
      { id: "alt-203", timestamp: "13:50 UTC", severity: "info", message: "Flight surgeon directed supplementary normobaric O2 session.", active: true }
    ],
    hourlyReadings: [
      { time: "00:00", heartRate: 64, oxygenLevel: 97.4, bodyTemperature: 36.6, activity: "Sleep" },
      { time: "02:00", heartRate: 66, oxygenLevel: 96.9, bodyTemperature: 36.7, activity: "Sleep (Restless)" },
      { time: "04:00", heartRate: 70, oxygenLevel: 96.5, bodyTemperature: 36.8, activity: "Sleep" },
      { time: "06:00", heartRate: 78, oxygenLevel: 96.0, bodyTemperature: 37.0, activity: "Awake" },
      { time: "08:00", heartRate: 88, oxygenLevel: 95.5, bodyTemperature: 37.2, activity: "Maintenance" },
      { time: "10:00", heartRate: 112, oxygenLevel: 94.6, bodyTemperature: 37.7, activity: "Stress Test" },
      { time: "12:00", heartRate: 104, oxygenLevel: 94.1, bodyTemperature: 37.8, activity: "Rest Period" },
      { time: "14:00", heartRate: 96, oxygenLevel: 94.9, bodyTemperature: 37.6, activity: "Oxygen Therapy" },
      { time: "16:00", heartRate: 98, oxygenLevel: 94.2, bodyTemperature: 37.6, activity: "Diagnostics" },
      { time: "18:00", heartRate: 94, oxygenLevel: 95.1, bodyTemperature: 37.5, activity: "Telemetry Sync" },
      { time: "20:00", heartRate: 90, oxygenLevel: 95.4, bodyTemperature: 37.4, activity: "Resting" },
      { time: "22:00", heartRate: 84, oxygenLevel: 95.8, bodyTemperature: 37.2, activity: "Meditation" },
    ],
    history: [
      { id: "h-21", timestamp: "Today 16:00 UTC", heartRate: 98, oxygenLevel: 94.2, bodyTemperature: 37.6, status: "Warning", notes: "Sub-nominal SpO2 logged" },
      { id: "h-22", timestamp: "Today 14:00 UTC", heartRate: 96, oxygenLevel: 94.9, bodyTemperature: 37.6, status: "Warning", notes: "During supplemental O2" },
      { id: "h-23", timestamp: "Today 11:30 UTC", heartRate: 112, oxygenLevel: 94.1, bodyTemperature: 37.8, status: "Warning", notes: "Post-exertion tachycardia" },
      { id: "h-24", timestamp: "Today 08:00 UTC", heartRate: 88, oxygenLevel: 95.5, bodyTemperature: 37.2, status: "Normal", notes: "Morning baseline check" },
    ]
  },

  {
    id: "AST-003",
    name: "Lt. Elena Rostova",
    callsign: "Orbiter",
    role: "Flight Systems Pilot / Roboticist",
    rank: "ESA Astronaut / Aerospace Engineer",
    mission: "ISS Expedition 74",
    missionDuration: "Day 88 of 210",
    spacecraft: "International Space Station / Node 3",
    bloodType: "B-Positive",
    age: 35,
    status: "CRITICAL",
    suitId: "Orlan-MKS",
    currentVitals: {
      heartRate: 124,
      oxygenLevel: 91.8,
      bodyTemperature: 38.6,
      bloodPressure: "145/95",
      respirationRate: 26,
      radiationDose: 0.52,
      suitPressure: 3.8,
    },
    dailySummary: {
      readinessScore: 58,
      sleepHours: 4.1,
      sleepEfficiency: "55% (Severely Disrupted)",
      caloricExpenditure: 3400,
      evaStatus: "IMMEDIATE RECALL TO AIRLOCK",
      flightSurgeonNote: "CRITICAL ALERT: Hyperthermia (38.6°C) and acute SpO2 drop (91.8%) during external robotic arm maintenance. Cooling garment malfunction suspected. Emergency ingress ordered.",
    },
    timeline: [
      { time: "04:30 UTC", title: "Early Pre-EVA Suiting & Seal Integrity Test", category: "EVA", status: "nominal", desc: "Suit leak rate 0.02 psi/min within specification." },
      { time: "06:15 UTC", title: "Airlock Depressurization & Egress", category: "EVA", status: "nominal", desc: "Ingress to Quest airlock outer hatch completed." },
      { time: "09:40 UTC", title: "Liquid Cooling Ventilation Garment (LCVG) Warning", category: "Hardware", status: "critical", desc: "Telemetry indicated coolant loop flow drop from 1.8 gpm to 0.4 gpm." },
      { time: "10:10 UTC", title: "Core Temperature Spike Detected (38.6°C)", category: "Medical", status: "critical", desc: "Heart rate jumped to 124 BPM. Flight Director issued mandatory abort." },
      { time: "10:35 UTC", title: "Airlock Ingress & Rapid Re-pressurization", category: "Emergency", status: "warning", desc: "Crew safely back in crewlock. Medical stabilization in progress." }
    ],
    alerts: [
      { id: "alt-301", timestamp: "09:45 UTC", severity: "critical", message: "CRITICAL: Core temperature elevated to 38.6°C (Thermal strain exceeding safety threshold).", active: true },
      { id: "alt-302", timestamp: "10:02 UTC", severity: "critical", message: "CRITICAL: Hypoxia indicator triggered — SpO2 at 91.8% in closed loop suit.", active: true },
      { id: "alt-303", timestamp: "10:12 UTC", severity: "critical", message: "FLIGHT SURGEON ABORT ORDER: Terminate EVA-24 immediately. Ingress crewlock.", active: true }
    ],
    hourlyReadings: [
      { time: "00:00", heartRate: 68, oxygenLevel: 98.2, bodyTemperature: 36.7, activity: "Resting" },
      { time: "02:00", heartRate: 70, oxygenLevel: 98.0, bodyTemperature: 36.8, activity: "Sleep" },
      { time: "04:00", heartRate: 78, oxygenLevel: 98.4, bodyTemperature: 36.9, activity: "Pre-EVA" },
      { time: "06:00", heartRate: 92, oxygenLevel: 97.8, bodyTemperature: 37.2, activity: "Egress" },
      { time: "08:00", heartRate: 108, oxygenLevel: 96.1, bodyTemperature: 37.7, activity: "EVA Task" },
      { time: "10:00", heartRate: 132, oxygenLevel: 91.5, bodyTemperature: 38.6, activity: "Cooling Failure" },
      { time: "11:00", heartRate: 124, oxygenLevel: 92.4, bodyTemperature: 38.4, activity: "Re-pressurization" },
      { time: "12:00", heartRate: 110, oxygenLevel: 94.0, bodyTemperature: 38.0, activity: "Active Cooling" },
      { time: "14:00", heartRate: 98, oxygenLevel: 95.8, bodyTemperature: 37.6, activity: "Hydration Therapy" },
      { time: "16:00", heartRate: 88, oxygenLevel: 96.8, bodyTemperature: 37.3, activity: "Stabilization" },
      { time: "18:00", heartRate: 82, oxygenLevel: 97.2, bodyTemperature: 37.1, activity: "Medical Rest" },
      { time: "20:00", heartRate: 76, oxygenLevel: 97.6, bodyTemperature: 36.9, activity: "Observation" }
    ],
    history: [
      { id: "h-31", timestamp: "Today 10:10 UTC", heartRate: 124, oxygenLevel: 91.8, bodyTemperature: 38.6, status: "Critical", notes: "Emergency abort condition triggered" },
      { id: "h-32", timestamp: "Today 09:40 UTC", heartRate: 115, oxygenLevel: 93.5, bodyTemperature: 38.1, status: "Critical", notes: "LCVG thermal failure" },
      { id: "h-33", timestamp: "Today 06:15 UTC", heartRate: 92, oxygenLevel: 97.8, bodyTemperature: 37.2, status: "Normal", notes: "Hatch egress nominal" },
      { id: "h-34", timestamp: "Today 04:30 UTC", heartRate: 78, oxygenLevel: 98.4, bodyTemperature: 36.9, status: "Normal", notes: "Pre-breathe complete" }
    ]
  },

  {
    id: "AST-004",
    name: "Dr. Alex Rivera",
    callsign: "Starfall",
    role: "Astrophysicist & Payload Specialist",
    rank: "JAXA / NASA Research Specialist",
    mission: "ISS Expedition 74",
    missionDuration: "Day 88 of 210",
    spacecraft: "Kibo Japanese Experiment Module",
    bloodType: "AB-Positive",
    age: 38,
    status: "NORMAL",
    suitId: "EMU-X79",
    currentVitals: {
      heartRate: 68,
      oxygenLevel: 98.9,
      bodyTemperature: 36.7,
      bloodPressure: "115/74",
      respirationRate: 15,
      radiationDose: 0.31,
      suitPressure: 4.4,
    },
    dailySummary: {
      readinessScore: 94,
      sleepHours: 8.0,
      sleepEfficiency: "94% (Exceptional)",
      caloricExpenditure: 2450,
      evaStatus: "Support Operations / Robotic Arm Console",
      flightSurgeonNote: "Cardiovascular health baseline exceptionally stable. Bone density countermeasures adherence 100%.",
    },
    timeline: [
      { time: "06:30 UTC", title: "Morning Health Self-Check", category: "Routine", status: "nominal", desc: "All biometrics nominal." },
      { time: "09:00 UTC", title: "Cold Atom Laboratory Quantum Experiment", category: "Science", status: "nominal", desc: "Bose-Einstein condensate telemetry collected." },
      { time: "13:00 UTC", title: "ARED Resistance Exercise Workout", category: "Exercise", status: "elevated", desc: "Max heart rate 142 BPM, 100% target load achieved." },
      { time: "16:30 UTC", title: "Crew Nutritional Assessment", category: "Nutrition", status: "nominal", desc: "Calcium and Vitamin D supplements administered." }
    ],
    alerts: [
      { id: "alt-401", timestamp: "13:40 UTC", severity: "nominal", message: "Workout protocol achieved 100% prescribed loading for bone mineral retention.", active: false }
    ],
    hourlyReadings: [
      { time: "00:00", heartRate: 54, oxygenLevel: 99.1, bodyTemperature: 36.3, activity: "Sleep" },
      { time: "04:00", heartRate: 53, oxygenLevel: 99.2, bodyTemperature: 36.3, activity: "Sleep" },
      { time: "08:00", heartRate: 68, oxygenLevel: 98.9, bodyTemperature: 36.6, activity: "Science" },
      { time: "12:00", heartRate: 72, oxygenLevel: 98.8, bodyTemperature: 36.7, activity: "Lunch" },
      { time: "14:00", heartRate: 136, oxygenLevel: 98.0, bodyTemperature: 37.3, activity: "Workout" },
      { time: "16:00", heartRate: 74, oxygenLevel: 98.7, bodyTemperature: 36.8, activity: "Lab Work" },
      { time: "20:00", heartRate: 65, oxygenLevel: 99.0, bodyTemperature: 36.5, activity: "Leisure" }
    ],
    history: [
      { id: "h-41", timestamp: "Today 16:30 UTC", heartRate: 68, oxygenLevel: 98.9, bodyTemperature: 36.7, status: "Normal", notes: "Lab station telemetry" },
      { id: "h-42", timestamp: "Today 13:30 UTC", heartRate: 136, oxygenLevel: 98.0, bodyTemperature: 37.3, status: "Elevated", notes: "Heavy loading segment" },
      { id: "h-43", timestamp: "Today 07:00 UTC", heartRate: 62, oxygenLevel: 99.0, bodyTemperature: 36.4, status: "Normal", notes: "Resting baseline" }
    ]
  },

  {
    id: "AST-005",
    name: "Col. James Sterling",
    callsign: "Titan",
    role: "Payload Commander & Geologist",
    rank: "NASA Senior Astronaut (O-6)",
    mission: "Artemis VII — Gateway Lunar Orbit",
    missionDuration: "Day 142 of 180",
    spacecraft: "Deep Space Gateway / Orion-4",
    bloodType: "O-Negative",
    age: 49,
    status: "NORMAL",
    suitId: "EMU-X91",
    currentVitals: {
      heartRate: 75,
      oxygenLevel: 98.1,
      bodyTemperature: 36.8,
      bloodPressure: "122/80",
      respirationRate: 16,
      radiationDose: 0.39,
      suitPressure: 4.3,
    },
    dailySummary: {
      readinessScore: 91,
      sleepHours: 7.1,
      sleepEfficiency: "88% (Normal)",
      caloricExpenditure: 2850,
      evaStatus: "EVA-2 Backup Operator",
      flightSurgeonNote: "Musculoskeletal adaptation to lunar orbit microgravity within expected clinical curves.",
    },
    timeline: [
      { time: "06:00 UTC", title: "Morning Briefing with Houston MCC", category: "Operations", status: "nominal", desc: "Flight plan synchronized." },
      { time: "10:15 UTC", title: "Lunar Sample Analysis in Sealed Glovebox", category: "Science", status: "nominal", desc: "Regolith core assessment." },
      { time: "14:00 UTC", title: "CEVIS Cycle Ergometer Session", category: "Exercise", status: "elevated", desc: "Target 180W workload sustained for 35 min." }
    ],
    alerts: [
      { id: "alt-501", timestamp: "14:40 UTC", severity: "info", message: "Cardiovascular exertion cycle completed safely.", active: false }
    ],
    hourlyReadings: [
      { time: "00:00", heartRate: 60, oxygenLevel: 98.6, bodyTemperature: 36.5, activity: "Sleep" },
      { time: "06:00", heartRate: 68, oxygenLevel: 98.4, bodyTemperature: 36.6, activity: "Awake" },
      { time: "10:00", heartRate: 74, oxygenLevel: 98.2, bodyTemperature: 36.8, activity: "Glovebox" },
      { time: "14:00", heartRate: 140, oxygenLevel: 97.6, bodyTemperature: 37.5, activity: "Cycle" },
      { time: "18:00", heartRate: 75, oxygenLevel: 98.1, bodyTemperature: 36.8, activity: "Comms" }
    ],
    history: [
      { id: "h-51", timestamp: "Today 16:00 UTC", heartRate: 75, oxygenLevel: 98.1, bodyTemperature: 36.8, status: "Normal", notes: "Post-workout vitals nominal" }
    ]
  },

  {
    id: "AST-006",
    name: "Eng. Mei-Ling Zhang",
    callsign: "Apex",
    role: "ECLSS & Life Support Systems Lead",
    rank: "CSA / NASA Flight Engineer",
    mission: "Artemis VII — Gateway Lunar Orbit",
    missionDuration: "Day 142 of 180",
    spacecraft: "Deep Space Gateway / Orion-4",
    bloodType: "A-Negative",
    age: 33,
    status: "NORMAL",
    suitId: "EMU-X86",
    currentVitals: {
      heartRate: 71,
      oxygenLevel: 98.7,
      bodyTemperature: 36.6,
      bloodPressure: "114/72",
      respirationRate: 14,
      radiationDose: 0.35,
      suitPressure: 4.4,
    },
    dailySummary: {
      readinessScore: 97,
      sleepHours: 7.8,
      sleepEfficiency: "95% (Optimal)",
      caloricExpenditure: 2520,
      evaStatus: "Internal ECLSS Monitoring",
      flightSurgeonNote: "All cardiovascular, hydration, and neurological biomarkers are in top percentile.",
    },
    timeline: [
      { time: "06:30 UTC", title: "Daily Bio-Vitals Calibration", category: "Routine", status: "nominal", desc: "Sensors cross-referenced with Gateway telemetry." },
      { time: "11:00 UTC", title: "Gateway Atmosphere Revitalization Inspection", category: "Operations", status: "nominal", desc: "Cabin pO2 21.2 kPa, pCO2 2.8 mmHg." },
      { time: "15:30 UTC", title: "Neuro-vestibular Adaptation Protocol", category: "Medical", status: "nominal", desc: "Zero motion sickness symptoms recorded." }
    ],
    alerts: [
      { id: "alt-601", timestamp: "11:05 UTC", severity: "nominal", message: "Atmospheric scrubbers operating at 99.8% filtration efficiency.", active: false }
    ],
    hourlyReadings: [
      { time: "00:00", heartRate: 57, oxygenLevel: 99.0, bodyTemperature: 36.4, activity: "Sleep" },
      { time: "06:00", heartRate: 65, oxygenLevel: 98.8, bodyTemperature: 36.5, activity: "Awake" },
      { time: "12:00", heartRate: 72, oxygenLevel: 98.6, bodyTemperature: 36.6, activity: "Inspections" },
      { time: "16:00", heartRate: 71, oxygenLevel: 98.7, bodyTemperature: 36.6, activity: "ECLSS Ops" }
    ],
    history: [
      { id: "h-61", timestamp: "Today 16:00 UTC", heartRate: 71, oxygenLevel: 98.7, bodyTemperature: 36.6, status: "Normal", notes: "Routine check" }
    ]
  }
];

export const STATUS_COLORS = {
  NORMAL: {
    bg: "bg-emerald-950/40",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    glow: "glow-emerald",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  },
  WARNING: {
    bg: "bg-amber-950/40",
    border: "border-amber-500/40",
    text: "text-amber-400",
    glow: "glow-amber",
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  },
  CRITICAL: {
    bg: "bg-rose-950/40",
    border: "border-rose-500/50",
    text: "text-rose-400",
    glow: "glow-red",
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-300 border border-rose-500/40",
  }
};
