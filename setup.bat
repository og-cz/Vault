@echo off
REM =============================================================================
REM Windows Setup Script for VAULT Image Analysis System
REM =============================================================================

setlocal enabledelayedexpansion
set GREEN=[92m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

echo %BLUE%==============================================================%NC%
echo %BLUE%  VAULT Image Analysis System - Unified Setup (Windows)    %NC%
echo %BLUE%==============================================================%NC%
echo.

REM Check Node.js
echo %BLUE%Checking Node.js...%NC%
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 16+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo %GREEN%✅ %NODE_VERSION%%NC%

REM Check npm
echo %BLUE%Checking npm...%NC%
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm not found
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo %GREEN%✅ npm %NPM_VERSION%%NC%

REM Check Python
echo %BLUE%Checking Python...%NC%
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo %GREEN%✅ %PYTHON_VERSION%%NC%

echo.
echo %BLUE%==============================================================%NC%
echo %YELLOW%Installing Dependencies...%NC%
echo %BLUE%==============================================================%NC%
echo.

REM Install Node.js dependencies
echo %BLUE%Installing Node.js packages...%NC%
call npm install
if errorlevel 1 (
    echo ❌ npm install failed
    exit /b 1
)

REM Install Python dependencies
echo %BLUE%Installing Python packages...%NC%
pip install -r backend\requirements.txt
if errorlevel 1 (
    echo ❌ pip install failed
    exit /b 1
)

echo.
echo %BLUE%==============================================================%NC%
echo %GREEN%✅ Setup Complete!%NC%
echo %BLUE%==============================================================%NC%
echo.
echo Start the application with:
echo.
echo %YELLOW%npm run dev%NC%        - Runs both backend and frontend
echo %YELLOW%npm run backend%NC%    - Runs only backend
echo %YELLOW%npm run frontend%NC%   - Runs only frontend
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo.
pause
