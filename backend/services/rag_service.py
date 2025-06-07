from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
import os
from typing import List, Dict
import json
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self):
        try:
            # Inicializar el modelo de embeddings
            logger.info("Inicializando modelo de embeddings...")
            self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
            
            # Asegurarse de que el directorio de datos existe
            os.makedirs("data/chroma", exist_ok=True)
            
            # Inicializar ChromaDB
            logger.info("Inicializando ChromaDB...")
            self.chroma_client = chromadb.Client(Settings(
                persist_directory="data/chroma",
                anonymized_telemetry=False
            ))
            
            # Crear o obtener la colección
            self.collection = self.chroma_client.get_or_create_collection(
                name="gobierno_docs",
                metadata={"hnsw:space": "cosine"}
            )
            
            # Cargar documentos iniciales si la colección está vacía
            if self.collection.count() == 0:
                logger.info("Cargando documentos iniciales...")
                self._load_initial_documents()
                
        except Exception as e:
            logger.error(f"Error al inicializar RAGService: {str(e)}")
            raise
    
    def _load_initial_documents(self):
        """Carga los documentos iniciales en la base de datos vectorial."""
        try:
            # Documentos de ejemplo en español
            documents = [
                "Para solicitar vivienda subsidiada en BC: 1. Visite el sitio web de BC Housing 2. Complete la solicitud del Registro de Vivienda 3. Proporcione los documentos requeridos",
                "Documentos requeridos para la solicitud de ciudadanía: 1. Pasaporte válido 2. Tarjeta de Residente Permanente 3. Resultados de prueba de idioma",
                "Pasos para obtener una licencia de conducir: 1. Estudiar el manual del conductor 2. Aprobar el examen teórico 3. Completar el entrenamiento",
                "Requisitos para beneficios sociales: 1. Comprobante de ingresos 2. Comprobante de gastos 3. Estado familiar 4. Estado de residencia",
                "Cómo registrarse para el seguro de salud: 1. Complete la solicitud MSP 2. Proporcione los documentos requeridos 3. Espere la tarjeta MSP"
            ]
            
            metadatas = [
                {"category": "vivienda", "language": "es"},
                {"category": "ciudadania", "language": "es"},
                {"category": "licencias", "language": "es"},
                {"category": "beneficios", "language": "es"},
                {"category": "salud", "language": "es"}
            ]
            
            ids = [f"doc{i+1}" for i in range(len(documents))]
            
            # Agregar documentos a la colección
            self.collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            logger.info(f"Se cargaron {len(documents)} documentos iniciales")
            
        except Exception as e:
            logger.error(f"Error al cargar documentos iniciales: {str(e)}")
            raise
    
    def query(self, question: str, language: str = "es") -> Dict:
        """
        Realiza una consulta al sistema RAG.
        
        Args:
            question: La pregunta del usuario
            language: El idioma de la respuesta (es/en)
            
        Returns:
            Dict con la respuesta y el contexto relevante
        """
        try:
            # Obtener embeddings de la pregunta
            query_embedding = self.embedding_model.encode(question).tolist()
            
            # Buscar documentos relevantes
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=3,
                where={"language": language}
            )
            
            # Construir el contexto
            context = "\n".join(results['documents'][0])
            
            return {
                "response": context,
                "sources": results['metadatas'][0]
            }
            
        except Exception as e:
            logger.error(f"Error al procesar consulta: {str(e)}")
            return {
                "response": "Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.",
                "sources": []
            }
    
    def add_document(self, document: str, metadata: Dict, doc_id: str):
        """
        Agrega un nuevo documento a la base de datos vectorial.
        
        Args:
            document: El texto del documento
            metadata: Metadatos del documento
            doc_id: ID único del documento
        """
        try:
            # Obtener embeddings del documento
            doc_embedding = self.embedding_model.encode(document).tolist()
            
            # Agregar a la colección
            self.collection.add(
                documents=[document],
                metadatas=[metadata],
                ids=[doc_id]
            )
            logger.info(f"Documento {doc_id} agregado exitosamente")
            
        except Exception as e:
            logger.error(f"Error al agregar documento: {str(e)}")
            raise 