import os
from datetime import datetime
from pathlib import Path
from typing import Optional, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

# ---------------------------------------------------------------------------
# Config  –  loads backend/.env first, then root .env as fallback
# ---------------------------------------------------------------------------
dotenv_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=dotenv_path, override=True)
load_dotenv()  # fallback for root .env or Vercel env vars

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "").strip().rstrip("/")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "").strip()

# Strip /rest/v1 suffix if the user included it in the URL
if SUPABASE_URL.endswith("/rest/v1"):
    SUPABASE_URL = SUPABASE_URL[:-8]

# In-memory fallback when Supabase is not configured
in_memory_telemetry: List[dict] = []

supabase_client: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"[ASTRA] Supabase client initialized → {SUPABASE_URL}")
    except Exception as exc:
        print(f"[ASTRA] WARNING: Supabase init failed: {exc}")
else:
    print("[ASTRA] WARNING: SUPABASE_URL or SUPABASE_KEY not set – using in-memory fallback")

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="ASTRA HEALTH API",
    description="Astronaut Health Monitoring Backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class TelemetryIn(BaseModel):
    astronaut_id: str
    heart_rate: float = Field(..., gt=0)
    oxygen_level: float = Field(..., ge=0, le=100)
    body_temperature: float = Field(..., gt=0)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/")
def home():
    return {
        "project": "ASTRA HEALTH",
        "message": "Backend is running!",
        "supabase_connected": supabase_client is not None,
    }


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "supabase_connected": supabase_client is not None,
        "storage": "supabase" if supabase_client else "in-memory",
    }


@app.post("/telemetry")
def receive_telemetry(data: TelemetryIn):
    record = {
        "astronaut_id": data.astronaut_id,
        "heart_rate": data.heart_rate,
        "oxygen_level": data.oxygen_level,
        "body_temperature": data.body_temperature,
        "recorded_at": datetime.utcnow().isoformat(),
    }

    if supabase_client:
        try:
            result = supabase_client.table("telemetry").insert(record).execute()
            return {
                "message": "Telemetry saved to Supabase",
                "storage": "supabase",
                "data": result.data,
            }
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"Supabase error: {exc}")
    else:
        record["id"] = len(in_memory_telemetry) + 1
        in_memory_telemetry.append(record)
        return {
            "message": "Telemetry saved in-memory (Supabase not connected)",
            "storage": "in-memory",
            "data": [record],
        }


@app.get("/telemetry")
def get_telemetry():
    if supabase_client:
        try:
            result = supabase_client.table("telemetry").select("*").order("recorded_at", desc=True).execute()
            return result.data
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"Supabase error: {exc}")
    else:
        return list(reversed(in_memory_telemetry))
