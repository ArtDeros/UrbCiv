const API_URL = import.meta.env.VITE_API_URL || 'https://urb-civ-git-main-arts-projects-82beb3b3.vercel.app/api';

export const ENDPOINTS = {
  CHAT: `${API_URL}/chat`,
  CONVERSATIONS: `${API_URL}/conversations`,
  RATE: `${API_URL}/rate`,
  FAVORITE: `${API_URL}/favorite`,
  TRANSPORT: `${API_URL}/transport`,
  LOCATION: `${API_URL}/location`,
  QR: `${API_URL}/qr`,
  IMAGE: `${API_URL}/image`
}; 