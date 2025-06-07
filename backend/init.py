import os
import sys
import logging
from pathlib import Path

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_environment():
    """Verifica que el entorno esté correctamente configurado."""
    try:
        # Verificar directorio de datos
        data_dir = Path("data/chroma")
        data_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Directorio de datos verificado: {data_dir}")

        # Verificar variables de entorno
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        logger.info(f"FRONTEND_URL configurado: {frontend_url}")

        # Verificar Python path
        python_path = sys.executable
        logger.info(f"Python path: {python_path}")

        # Verificar directorio actual
        current_dir = Path.cwd()
        logger.info(f"Directorio actual: {current_dir}")

        return True
    except Exception as e:
        logger.error(f"Error en la verificación del entorno: {str(e)}")
        return False

def create_env_file():
    """Crea el archivo .env si no existe."""
    env_path = Path(".env")
    if not env_path.exists():
        try:
            with open(env_path, "w") as f:
                f.write("FRONTEND_URL=http://localhost:3000\n")
            logger.info("Archivo .env creado exitosamente")
        except Exception as e:
            logger.error(f"Error al crear archivo .env: {str(e)}")
            return False
    return True

if __name__ == "__main__":
    logger.info("Iniciando verificación del entorno...")
    if check_environment() and create_env_file():
        logger.info("Configuración completada exitosamente")
    else:
        logger.error("Error en la configuración")
        sys.exit(1) 