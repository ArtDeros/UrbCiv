# MAPLE

**Meaningful Assistance for People Living Everywhere**

MAPLE es un asistente inteligente que combina APIs oficiales (gobierno, cultura, negocios) y RAG para ofrecer respuestas confiables, contextualizadas y escalables para personas en Canadá.

## Instalación y uso rápido

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/MAPLE.git
   cd MAPLE
   ```
2. Configura las variables de entorno en `backend/.env`:
   ```env
   CANADA_OPEN_DATA_KEY=tu_api_key
   VANCOUVER_OPEN_DATA_KEY=tu_api_key
   BC_DATA_KEY=tu_api_key
   YELP_API_KEY=tu_api_key
   GOOGLE_MAPS_KEY=tu_api_key
   FRONTEND_URL=http://localhost:3000
   ```
3. Ejecuta el sistema:
   ```bash
   ./start.bat
   ```

## Endpoints principales

- `/query` (POST): Consulta general (RAG)
- `/tourist-events?location=Vancouver&type=event` (GET): Eventos turísticos
- `/local-businesses?location=Vancouver&category=restaurants` (GET): Restaurantes y comida
- `/emergency-help?location=Vancouver` (GET): Ayuda de emergencia
- `/immigrant-services?language=es` (GET): Servicios para inmigrantes
- `/housing?location=Vancouver` (GET): Información de vivienda
- `/geolocation?address=Stanley+Park+Vancouver` (GET): Geolocalización

## Ejemplo de respuesta
```json
{
  "place": "Stanley Park",
  "category": "Nature",
  "open_hours": "6AM - 11PM",
  "map_link": "https://maps.google.com/?q=stanley+park",
  "tips": "Ideal para caminar, andar en bici y picnic."
}
```

## Pruebas
Puedes probar los endpoints con Postman o desde el frontend. El chatbot detecta automáticamente la intención y llama a la API adecuada.

## Personalización y escalabilidad
- Puedes agregar nuevas APIs en `backend/services/government_apis.py`.
- Para autenticación, consulta la sección `auth` (próximamente).

## Licencia
MIT 