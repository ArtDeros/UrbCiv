from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.rag_service import RAGService
from services.government_apis import GovernmentAPIService
import os
from dotenv import load_dotenv
import logging
import uvicorn
from init import check_environment, create_env_file

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Verificar y crear configuración inicial
if not check_environment() or not create_env_file():
    logger.error("Error en la configuración inicial")
    raise RuntimeError("Error en la configuración inicial")

# Cargar variables de entorno
load_dotenv()

app = FastAPI(
    title="MAPLE API",
    description="Meaningful Assistance for People Living Everywhere - API que combina RAG con APIs gubernamentales",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar el servicio RAG
try:
    rag_service = RAGService()
    gov_api_service = GovernmentAPIService()
    logger.info("Servicio RAG inicializado correctamente")
except Exception as e:
    logger.error(f"Error al inicializar el servicio RAG: {str(e)}")
    raise

class Query(BaseModel):
    text: str
    language: str = "en"

class LocationQuery(BaseModel):
    location: str
    type: Optional[str] = None
    language: Optional[str] = "en"

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Error global: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Error interno del servidor"}
    )

@app.get("/")
async def root():
    return {"message": "Bienvenido a MAPLE API"}

@app.post("/query")
async def query(query: Query):
    try:
        logger.info(f"Procesando consulta: {query.text}")
        response = await rag_service.query(query.text, query.language)
        return response
    except Exception as e:
        logger.error(f"Error al procesar consulta: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/housing")
async def get_housing_info(location: str):
    try:
        return await gov_api_service.get_housing_info(location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/immigrant-services")
async def get_immigrant_services(language: str = "en"):
    try:
        return await gov_api_service.get_immigrant_services(language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tourist-events")
async def get_tourist_events(location: str, type: Optional[str] = None):
    try:
        return await gov_api_service.get_tourist_events(location, type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/emergency-help")
async def get_emergency_help(location: str):
    try:
        return await gov_api_service.get_emergency_help(location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/local-businesses")
async def get_local_businesses(location: str, category: str):
    try:
        return await gov_api_service.get_local_businesses(location, category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/geolocation")
async def get_geolocation(address: str):
    try:
        return await gov_api_service.get_geolocation(address)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "rag",
        "frontend_url": os.getenv("FRONTEND_URL", "http://localhost:3000")
    }

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
