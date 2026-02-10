#!/bin/bash
# ============================================================================
# VAULT Unified System - Quick Start Script
# ============================================================================
# This file documents the exact commands to get the system running

echo "🚀 VAULT Image Analysis System - Complete Setup"
echo "=============================================================="
echo ""

# Step 1: Navigate to TypeScript folder
echo "Step 1️⃣: Navigate to TypeScript project"
echo "Command:"
echo "  cd typescript"
echo ""

# Step 2: Install dependencies
echo "Step 2️⃣: Install all dependencies"
echo "Command:"
echo "  npm run setup"
echo ""
echo "What this does:"
echo "  - npm install (Node.js packages)"
echo "  - pip install -r backend/requirements.txt (Python packages)"
echo ""

# Step 3: Start the system
echo "Step 3️⃣: Start everything"
echo "Command:"
echo "  npm run dev"
echo ""
echo "What this does:"
echo "  - Starts Express backend on http://localhost:8000"
echo "  - Starts React frontend on http://localhost:5173"
echo ""

# Step 4: Open browser
echo "Step 4️⃣: Open browser"
echo "URL:"
echo "  http://localhost:5173"
echo ""

echo "=============================================================="
echo ""
echo "✨ That's it! Your system is ready."
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "USEFUL COMMANDS"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Run backend only:"
echo "  npm run backend"
echo ""
echo "Run frontend only:"
echo "  npm run frontend"
echo ""
echo "Run setup again:"
echo "  npm run setup"
echo ""
echo "Check health of backend:"
echo "  curl http://localhost:8000/api/health/"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📚 Documentation files:"
echo "  - QUICK_START_UNIFIED.md (2 mins)"
echo "  - typescript/README.md (10 mins)"
echo "  - UNIFIED_INTEGRATION_GUIDE.md (15 mins)"
echo ""
echo "🆘 Having issues?"
echo "  See UNIFIED_INTEGRATION_GUIDE.md -> Troubleshooting section"
echo ""
echo "✅ Ready to go! 🚀"
