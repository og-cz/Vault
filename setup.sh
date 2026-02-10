#!/bin/bash
# =============================================================================
# Unified Backend + Frontend Setup and Run Script
# =============================================================================

set -e

echo "🚀 VAULT Image Analysis System - Unified Setup"
echo "================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION}${NC}"

# Check npm
echo -e "${BLUE}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION}${NC}"

# Check Python
echo -e "${BLUE}Checking Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}✅ ${PYTHON_VERSION}${NC}"

# Check pip
echo -e "${BLUE}Checking pip...${NC}"
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 not found"
    exit 1
fi
echo -e "${GREEN}✅ pip3 ready${NC}"

echo ""
echo "================================================="
echo -e "${YELLOW}Installing Dependencies...${NC}"
echo "================================================="
echo ""

# Install Node.js dependencies
echo -e "${BLUE}Installing Node.js packages...${NC}"
npm install

# Install Python dependencies
echo -e "${BLUE}Installing Python packages...${NC}"
pip3 install -r backend/requirements.txt

echo ""
echo "================================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "================================================="
echo ""
echo "Start the application with:"
echo ""
echo -e "${YELLOW}npm run dev${NC}        # Runs both backend & frontend"
echo -e "${YELLOW}npm run backend${NC}   # Runs only backend"
echo -e "${YELLOW}npm run frontend${NC}  # Runs only frontend"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo ""
