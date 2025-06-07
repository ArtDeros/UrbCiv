@echo off
echo Iniciando el sistema...

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python no está instalado o no está en el PATH
    exit /b 1
)

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js no está instalado o no está en el PATH
    exit /b 1
)

REM Instalar dependencias
echo Instalando dependencias...
call npm install
if errorlevel 1 (
    echo Error al instalar dependencias de Node.js
    exit /b 1
)

cd frontend
call npm install
if errorlevel 1 (
    echo Error al instalar dependencias del frontend
    exit /b 1
)
cd ..

cd backend
echo Instalando dependencias de Python...
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo Error al instalar dependencias de Python
    exit /b 1
)

REM Verificar configuración inicial
python init.py
if errorlevel 1 (
    echo Error en la configuración inicial
    exit /b 1
)

REM Iniciar el backend
start cmd /k "python -m uvicorn app:app --reload --port 8000"

REM Volver al directorio raíz
cd ..

REM Iniciar el frontend
start cmd /k "cd frontend && npm run dev"

echo Sistema iniciado correctamente
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000 