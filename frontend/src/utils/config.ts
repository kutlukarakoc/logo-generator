export const API_BASE_URL = 'https://logo-generator-production.up.railway.app/api';

export const ENDPOINTS = {
  GENERATE_LOGO: `${API_BASE_URL}/logo/generate`,
  CHECK_STATUS: (id: string) => `${API_BASE_URL}/logo/status/${id}`,
}; 