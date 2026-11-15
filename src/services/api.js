/**
 * ASTRA HEALTH - Centralized API Service
 * Manages communication with the FastAPI backend.
 * All Supabase interactions are handled securely on the backend server.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Check backend health status
   * Endpoint: GET /health
   */
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Health check returned HTTP ${response.status}`);
      }

      const data = await response.json();
      return { online: true, data };
    } catch (error) {
      return { online: false, error: error.message || 'Backend unreachable' };
    }
  }

  /**
   * Fetch all recorded astronaut telemetry readings
   * Endpoint: GET /telemetry
   */
  async getTelemetry() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`${this.baseUrl}/telemetry`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch telemetry: HTTP ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.warn('[ASTRA API] getTelemetry fallback to demo mode:', error.message);
      return { success: false, error: error.message, data: [] };
    }
  }

  /**
   * Submit new astronaut telemetry packet to backend (persisted to Supabase)
   * Endpoint: POST /telemetry
   * @param {Object} telemetryData
   * @param {string} telemetryData.astronaut_id - e.g. "AST-001"
   * @param {number} telemetryData.heart_rate - in BPM
   * @param {number} telemetryData.oxygen_level - in SpO2 %
   * @param {number} telemetryData.body_temperature - in °C
   */
  async postTelemetry(telemetryData) {
    try {
      const response = await fetch(`${this.baseUrl}/telemetry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          astronaut_id: String(telemetryData.astronaut_id),
          heart_rate: Number(telemetryData.heart_rate),
          oxygen_level: Number(telemetryData.oxygen_level),
          body_temperature: Number(telemetryData.body_temperature),
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Server error ${response.status}: ${errorDetail}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to submit telemetry' };
    }
  }

  /**
   * Home endpoint for metadata
   * Endpoint: GET /
   */
  async getRoot() {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      return await response.json();
    } catch (error) {
      return null;
    }
  }
}

export const api = new ApiService(API_BASE_URL);
export default api;
