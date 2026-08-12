/**
 * Axios HTTP Client Instance
 * Pre-configured with base URL from environment variables and standard JSON headers.
 */

import axios from "axios";

const api = axios.create({
  // Base URL configured via environment variable `VITE_API_URL`
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;