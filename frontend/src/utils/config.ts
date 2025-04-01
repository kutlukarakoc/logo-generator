// Replace with your actual backend URL in production
export const API_BASE_URL = 'http://localhost:3000/api';

export const ENDPOINTS = {
  GENERATE_LOGO: `${API_BASE_URL}/logo/generate`,
  CHECK_STATUS: (id: string) => `${API_BASE_URL}/logo/status/${id}`,
}; 