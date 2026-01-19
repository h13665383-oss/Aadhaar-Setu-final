@echo off
setlocal
title UIDAI Prototype Hub Launcher

echo ===================================================
echo       UIDAI Prototype Hub - Hackathon 2026
echo ===================================================
echo.

:: 1. Check Node.js
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    pause
    exit /b 1
)

:: 2. Check Python and Create Virtual Environment
echo [2/5] Checking Python environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    pause
    exit /b 1
)

set "VENV_DIR=d:\ONGC\venv"
if not exist "%VENV_DIR%\" (
    echo Creating virtual environment in %VENV_DIR%...
    python -m venv "%VENV_DIR%"
)

:: 3. Install/Check Dependencies
echo.
echo [3/5] Checking dependencies...
if not exist "node_modules\" (
    echo Installing Node modules...
    call npm install
)

echo Installing Python requirements into virtual environment...
"%VENV_DIR%\Scripts\pip" install flask flask-cors pandas >nul 2>&1

:: 4. Start Backend (in Venv)
echo.
echo [4/5] Starting Data Backend...
echo Launching Flask Server from d:/ONGC/app.py...
start "UIDAI Backend" "%VENV_DIR%\Scripts\python" "d:/ONGC/app.py"

:: Give backend a moment to initialize
timeout /t 3 /nobreak >nul

:: 5. Start Frontend
echo.
echo [5/5] Starting Dashboard Frontend...
echo.
echo ===================================================
echo   Access the Dashboard at: http://localhost:8080
echo ===================================================
echo.
echo Press Ctrl+C to stop the frontend (Backend window must be closed manually).
echo.
call npm run dev

endlocal
