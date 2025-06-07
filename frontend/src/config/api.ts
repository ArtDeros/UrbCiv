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

export const API_ENDPOINTS = {
  chat: 'http://localhost:8000/chat',
  housing: 'http://localhost:8000/housing',
  immigrantServices: 'http://localhost:8000/immigrant-services',
  touristEvents: 'http://localhost:8000/tourist-events',
  emergencyHelp: 'http://localhost:8000/emergency-help',
  localBusinesses: 'http://localhost:8000/local-businesses',
  geolocation: 'http://localhost:8000/geolocation',
};

export const API_KEYS = {
  googleMaps: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  yelp: process.env.REACT_APP_YELP_API_KEY,
  bcData: process.env.REACT_APP_BC_DATA_API_KEY,
  vancouverOpenData: process.env.REACT_APP_VANCOUVER_OPEN_DATA_API_KEY,
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}; 