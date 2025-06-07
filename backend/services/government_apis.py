import os
import requests
from typing import Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

class GovernmentAPIService:
    def __init__(self):
        self.canada_open_data_key = os.getenv("CANADA_OPEN_DATA_KEY")
        self.vancouver_open_data_key = os.getenv("VANCOUVER_OPEN_DATA_KEY")
        self.bc_data_key = os.getenv("BC_DATA_KEY")
        self.yelp_api_key = os.getenv("YELP_API_KEY")
        self.google_maps_key = os.getenv("GOOGLE_MAPS_KEY")

    async def get_housing_info(self, location: str) -> Dict:
        """Obtiene información sobre vivienda de las APIs gubernamentales."""
        try:
            # Ejemplo de integración con BC Housing API
            response = requests.get(
                f"https://api.bchousing.org/v1/housing",
                params={"location": location},
                headers={"Authorization": f"Bearer {self.bc_data_key}"}
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    async def get_immigrant_services(self, language: str = "en") -> Dict:
        """Obtiene información sobre servicios para inmigrantes."""
        try:
            # Integración con WelcomeBC API
            response = requests.get(
                "https://api.welcomebc.ca/v1/services",
                params={"language": language},
                headers={"Authorization": f"Bearer {self.bc_data_key}"}
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    async def get_tourist_events(self, location: str, type: Optional[str] = None) -> Dict:
        """Obtiene información sobre eventos turísticos y lugares de interés."""
        try:
            # Integración con Tourism Vancouver API
            response = requests.get(
                "https://api.tourismvancouver.com/v1/events",
                params={
                    "location": location,
                    "type": type,
                    "key": self.vancouver_open_data_key
                }
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    async def get_emergency_help(self, location: str) -> Dict:
        """Obtiene información sobre servicios de emergencia."""
        try:
            # Integración con Emergency Services API
            response = requests.get(
                "https://api.emergency.bc.ca/v1/services",
                params={"location": location},
                headers={"Authorization": f"Bearer {self.bc_data_key}"}
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    async def get_local_businesses(self, location: str, category: str) -> Dict:
        """Obtiene información sobre negocios locales usando Yelp API."""
        try:
            response = requests.get(
                "https://api.yelp.com/v3/businesses/search",
                params={
                    "location": location,
                    "categories": category
                },
                headers={"Authorization": f"Bearer {self.yelp_api_key}"}
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    async def get_geolocation(self, address: str) -> Dict:
        """Obtiene coordenadas geográficas usando Google Maps API."""
        try:
            response = requests.get(
                "https://maps.googleapis.com/maps/api/geocode/json",
                params={
                    "address": address,
                    "key": self.google_maps_key
                }
            )
            return response.json()
        except Exception as e:
            return {"error": str(e)} 