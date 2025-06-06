export const API_URL = import.meta.env.VITE_API_URL || 'https://urb-civ-git-main-arts-projects-82beb3b3.vercel.app/api';

export const ENDPOINTS = {
  CHAT: `${API_URL}/chat`,
  CONVERSATIONS: `${API_URL}/chat/conversations`,
  RATE: `${API_URL}/chat/rate`,
  FAVORITE: `${API_URL}/chat/favorite`
}; 