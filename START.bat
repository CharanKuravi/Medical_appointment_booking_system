@echo off
echo ========================================
echo Starting MedLink Application
echo ========================================
echo.

echo [1/4] Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed!
echo.

echo [2/4] Starting Backend Server...
start "MedLink Backend" cmd /k "cd server && npm install && npm start"
echo Backend server starting in new window...
echo Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul
echo.

echo [3/4] Starting Frontend Server...
start "MedLink Frontend" cmd /k "cd client && npm install && npm run dev"
echo Frontend server starting in new window...
echo.

echo [4/4] Opening browser...
timeout /t 5 /nobreak >nul
start http://localhost:5173
echo.

echo ========================================
echo MedLink is starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two new windows have opened:
echo 1. Backend Server (keep it running)
echo 2. Frontend Server (keep it running)
echo.
echo Press any key to close this window...
pause >nul
