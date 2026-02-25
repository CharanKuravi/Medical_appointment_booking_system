@echo off
color 0A
echo ========================================
echo MedLink - Fix and Start
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Node.js is NOT installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and install it.
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

echo ========================================
echo Step 1: Cleaning old files...
echo ========================================
echo.

echo Cleaning server...
cd server
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
cd ..

echo Cleaning client...
cd client
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
cd ..

echo Done cleaning!
echo.

echo ========================================
echo Step 2: Installing dependencies...
echo ========================================
echo.

echo Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    color 0C
    echo ERROR: Failed to install server dependencies!
    echo.
    echo Trying to fix...
    call npm cache clean --force
    call npm install
    if errorlevel 1 (
        echo Still failed. Please check your internet connection.
        pause
        exit /b 1
    )
)
cd ..

echo Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    color 0C
    echo ERROR: Failed to install client dependencies!
    pause
    exit /b 1
)
cd ..

echo.
echo All dependencies installed successfully!
echo.

echo ========================================
echo Step 3: Starting servers...
echo ========================================
echo.

echo Starting Backend Server...
start "MedLink Backend - DO NOT CLOSE" cmd /k "color 0B && cd server && echo Backend Server Running... && npm start"

echo Waiting for backend to start...
timeout /t 8 /nobreak >nul

echo Starting Frontend Server...
start "MedLink Frontend - DO NOT CLOSE" cmd /k "color 0E && cd client && echo Frontend Server Running... && npm run dev"

echo Waiting for frontend to start...
timeout /t 8 /nobreak >nul

echo.
echo ========================================
echo Opening browser...
echo ========================================
start http://localhost:5173

echo.
color 0A
echo ========================================
echo SUCCESS! MedLink is running!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two windows are now open:
echo 1. Backend Server (Blue) - Keep it running
echo 2. Frontend Server (Yellow) - Keep it running
echo.
echo DO NOT CLOSE those windows!
echo.
echo Your browser should open automatically.
echo If not, go to: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
