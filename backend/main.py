import os
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
load_dotenv()

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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
    allow_origins=["*"],  # tighten in production
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
    }


@app.get("/health")
def health_check():
    return {"status": "online"}


@app.post("/telemetry")
def receive_telemetry(data: TelemetryIn):
    record = {
        "astronaut_id": data.astronaut_id,
        "heart_rate": data.heart_rate,
        "oxygen_level": data.oxygen_level,
        "body_temperature": data.body_temperature,
        "recorded_at": datetime.now().isoformat(),
    }

    try:
        result = supabase.table("telemetry").insert(record).execute()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

    return {
        "message": "Telemetry received successfully",
        "data": result.data,
    }


@app.get("/telemetry")
def get_telemetry():
    try:
        result = supabase.table("telemetry").select("*").execute()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

    return result.data
