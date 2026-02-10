/**
 * Express.js Backend Server
 * 
 * Provides REST API endpoints that call Python analysis functions
 * Runs on localhost:8000
 * Integrated with React frontend on localhost:5173
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

/**
 * Health Check Endpoint
 * GET /api/health/
 */
app.get('/api/health/', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Image Analysis Endpoint
 * POST /api/analyze/
 * 
 * Accepts multipart/form-data with 'image' field
 * Calls Python analysis script via child_process
 * Returns JSON with forensics and ML results
 */
app.post('/api/analyze/', upload.single('image'), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded. Use form field 'image'.",
      });
    }

    const imageFile = req.file;
    const fileBytes = imageFile.buffer;
    const fileName = imageFile.originalname;

    // Convert to base64 for Python worker
    const base64Image = fileBytes.toString('base64');

    // Call Python worker
    const pythonResult = await runPythonAnalysis(base64Image, fileName);

    // Return result
    res.json(pythonResult);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
});

/**
 * Run Python analysis script
 * Spawns child process to execute image analysis
 * 
 * @param {string} base64Image - Base64 encoded image
 * @param {string} fileName - Original filename
 * @returns {Promise<Object>} Analysis results
 */
function runPythonAnalysis(base64Image, fileName) {
  return new Promise((resolve, reject) => {
    // Path to Python worker script
    const pythonScriptPath = path.join(__dirname, 'python-workers', 'analyze-image.py');

    // Check if Python script exists
    if (!fs.existsSync(pythonScriptPath)) {
      reject(new Error(`Python worker script not found: ${pythonScriptPath}`));
      return;
    }

    const defaultPython = process.platform === 'win32' ? 'python' : 'python3';
    const pythonExecutable = process.env.PYTHON_EXECUTABLE || defaultPython;

    // Spawn Python process
    const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, base64Image, fileName], {
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1',
        PYTHONPATH: path.join(__dirname),  // Add current backend dir to Python path
      },
      timeout: 60000, // 60 second timeout
    });

    let output = '';
    let errorOutput = '';

    // Collect stdout
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Collect stderr
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error('Python stderr:', data.toString());
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${errorOutput}`));
        return;
      }

      try {
        // Parse JSON output from Python
        const result = JSON.parse(output);
        resolve(result);
      } catch (parseError) {
        reject(new Error(`Failed to parse Python output: ${parseError.message}`));
      }
    });

    // Handle process errors
    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to spawn Python process: ${error.message}`));
    });

    // Set timeout
    setTimeout(() => {
      pythonProcess.kill();
      reject(new Error('Python analysis timeout (>60s)'));
    }, 60000);
  });
}

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({
    status: 'error',
    error: err.message,
  });
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`\n✅ Backend API Server running on http://localhost:${PORT}`);
  console.log(`   Health check: GET http://localhost:${PORT}/api/health/`);
  console.log(`   Image analysis: POST http://localhost:${PORT}/api/analyze/`);
  console.log(`   CORS enabled for: localhost:3000, localhost:5173\n`);
});

module.exports = app;
