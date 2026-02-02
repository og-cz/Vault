const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const resultsPanel = document.getElementById('resultsPanel');

let uploadedFile = null;
let previewUrl = null;
let imageMeta = { width: null, height: null };
let lastResult = null;

function showPage(pageName) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageName) {
            page.classList.add('active');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);
}

function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return '—';
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function toPercent(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return 0;
    const numeric = Number(value);
    if (numeric <= 1) return Math.round(numeric * 100);
    return Math.min(100, Math.round(numeric));
}

function getStatusLabel(label) {
    if (!label) return { text: 'UNKNOWN', className: 'unknown' };
    const normalized = String(label).toLowerCase();
    if (normalized.includes('fake') || normalized.includes('fabricated')) {
        return { text: 'FABRICATED', className: 'fake' };
    }
    if (normalized.includes('authentic') || normalized.includes('real')) {
        return { text: 'AUTHENTIC', className: 'authentic' };
    }
    return { text: label.toString().toUpperCase(), className: 'unknown' };
}

function renderDropzoneDefault() {
    dropzone.classList.remove('has-image');
    dropzone.innerHTML = `
        <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <h3>Drop your image here</h3>
        <p>or click to browse</p>
        <p style="margin-top: 1rem; font-size: 0.85rem;">Supports: JPG, PNG, WEBP, GIF</p>
    `;
}

function renderDropzonePreview() {
    dropzone.classList.add('has-image');
    dropzone.innerHTML = `
        <div class="uploaded-image-container">
            <img src="${previewUrl}" alt="Uploaded image" class="uploaded-image">
            <div class="image-label">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                </svg>
                Uploaded Image
            </div>
            <button class="close-btn" data-action="reset-upload" aria-label="Remove image">×</button>
        </div>
        <button class="analyze-btn" data-action="analyze-image">ANALYZE IMAGE</button>
    `;
}

function resetUpload() {
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }
    previewUrl = null;
    uploadedFile = null;
    imageMeta = { width: null, height: null };
    fileInput.value = '';
    renderDropzoneDefault();
    resultsPanel.classList.add('empty');
    resultsPanel.innerHTML = '<p>Click "Analyze Image" to start verification</p>';
    lastResult = null;
}

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    uploadedFile = file;
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(file);

    const image = new Image();
    image.onload = () => {
        imageMeta = { width: image.naturalWidth, height: image.naturalHeight };
        renderDropzonePreview();
    };
    image.src = previewUrl;

    resultsPanel.classList.add('empty');
    resultsPanel.innerHTML = '<p>Click "Analyze Image" to start verification</p>';
}

async function analyzeImage() {
    if (!uploadedFile) return;

    resultsPanel.classList.remove('empty');
    resultsPanel.innerHTML = '<p style="text-align: center; padding: 4rem;">Analyzing image...</p>';

    const formData = new FormData();
    formData.append('image', uploadedFile);

    try {
        const response = await fetch('/api/analyze/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to analyze image');
        }

        const data = await response.json();
        lastResult = data;
        showResults(data);
    } catch (error) {
        resultsPanel.innerHTML = `
            <p style="text-align: center; padding: 4rem; color: var(--primary-red);">
                ${error.message || 'Something went wrong.'}
            </p>
        `;
    }
}

function buildDetectionItems(checks) {
    if (!Array.isArray(checks) || checks.length === 0) {
        return `
            <div class="detection-item">
                <div class="detection-header">
                    <div class="detection-name">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Digital Forensics
                    </div>
                    <span class="detection-score">Pending</span>
                </div>
                <p class="detection-description">Forensics checks will appear here after integration.</p>
                <div class="detection-bar">
                    <div class="detection-bar-fill" data-score="0" style="width: 0%"></div>
                </div>
            </div>
        `;
    }

    return checks.map(check => {
        const score = toPercent(check.score ?? check.confidence ?? 0);
        const description = check.description || check.notes || 'No details provided.';
        const status = check.status || (score >= 60 ? 'pass' : 'warning');
        const descriptionClass = status === 'warning' ? 'detection-description warning' : 'detection-description';
        return `
            <div class="detection-item">
                <div class="detection-header">
                    <div class="detection-name">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${check.name || 'Forensics Check'}
                    </div>
                    <span class="detection-score">${score}%</span>
                </div>
                <p class="${descriptionClass}">${description}</p>
                <div class="detection-bar">
                    <div class="detection-bar-fill" data-score="${score}" style="width: 0%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function showResults(data) {
    const file = data.file || {};
    const forensics = data.forensics || {};
    const mlResult = data.ml_result || {};
    const summary = data.summary || {};

    const confidence = toPercent(summary.overall_confidence ?? mlResult.confidence ?? 0);
    const status = getStatusLabel(summary.label || mlResult.prediction || 'unknown');

    resultsPanel.innerHTML = `
        <div class="overall-result">
            <h3>OVERALL RESULT</h3>
            <div class="result-status ${status.className}">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${status.text}</span>
            </div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: 0%"></div>
            </div>
            <div class="confidence-text">${confidence}%</div>
        </div>

        <div class="file-info">
            <h4>FILE INFORMATION</h4>
            <div class="file-info-grid">
                <div class="file-info-item">
                    <span class="file-info-label">File:</span>
                    <span class="file-info-value">${file.name || uploadedFile?.name || '—'}</span>
                </div>
                <div class="file-info-item">
                    <span class="file-info-label">Size:</span>
                    <span class="file-info-value">${formatBytes(file.size_bytes || uploadedFile?.size)}</span>
                </div>
                <div class="file-info-item">
                    <span class="file-info-label">Dimensions:</span>
                    <span class="file-info-value">${imageMeta.width && imageMeta.height ? `${imageMeta.width} x ${imageMeta.height}` : '—'}</span>
                </div>
                <div class="file-info-item">
                    <span class="file-info-label">Format:</span>
                    <span class="file-info-value">${file.content_type ? file.content_type.split('/')[1].toUpperCase() : (uploadedFile?.type ? uploadedFile.type.split('/')[1].toUpperCase() : '—')}</span>
                </div>
                <div class="file-info-item">
                    <span class="file-info-label">Upload Date:</span>
                    <span class="file-info-value">${file.uploaded_at || '—'}</span>
                </div>
                <div class="file-info-item">
                    <span class="file-info-label">MD5 Hash:</span>
                    <span class="file-info-value">${file.md5 || '—'}</span>
                </div>
            </div>
        </div>

        <div class="detection-results">
            <h4>DIGITAL FORENSICS</h4>
            ${buildDetectionItems(forensics.checks)}
        </div>

        <div class="detection-results">
            <h4>MACHINE LEARNING</h4>
            <div class="detection-item">
                <div class="detection-header">
                    <div class="detection-name">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${mlResult.prediction ? 'Model Prediction' : 'Model Output'}
                    </div>
                    <span class="detection-score">${confidence}%</span>
                </div>
                <p class="detection-description">${mlResult.notes || 'Awaiting ML pipeline integration.'}</p>
                <div class="detection-bar">
                    <div class="detection-bar-fill" data-score="${confidence}" style="width: 0%"></div>
                </div>
            </div>
        </div>

        <div class="download-buttons">
            <button class="download-btn" data-action="download-json">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                DOWNLOAD JSON
            </button>
            <button class="download-btn" data-action="download-report">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                DOWNLOAD REPORT
            </button>
        </div>
    `;

    setTimeout(() => {
        const confidenceFill = resultsPanel.querySelector('.confidence-fill');
        if (confidenceFill) {
            confidenceFill.style.width = `${confidence}%`;
        }

        const detectionBars = resultsPanel.querySelectorAll('.detection-bar-fill');
        detectionBars.forEach((bar, index) => {
            const score = bar.dataset.score || 0;
            setTimeout(() => {
                bar.style.width = `${score}%`;
            }, 150 + (index * 80));
        });
    }, 100);
}

function downloadJson() {
    if (!lastResult) return;
    const blob = new Blob([JSON.stringify(lastResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault-analysis-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function downloadReport() {
    if (!lastResult) return;
    const summary = lastResult.summary || {};
    const file = lastResult.file || {};
    const mlResult = lastResult.ml_result || {};
    const report = [
        'Vault Analysis Report',
        '=====================',
        `File: ${file.name || uploadedFile?.name || '—'}`,
        `Size: ${formatBytes(file.size_bytes || uploadedFile?.size)}`,
        `MD5: ${file.md5 || '—'}`,
        `Overall Confidence: ${toPercent(summary.overall_confidence ?? mlResult.confidence ?? 0)}%`,
        `Prediction: ${summary.label || mlResult.prediction || 'unknown'}`,
        '',
        'Notes:',
        mlResult.notes || 'No ML notes provided.'
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function handleDropzoneAction(event) {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) {
        if (!dropzone.classList.contains('has-image')) {
            fileInput.click();
        }
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const action = actionButton.dataset.action;
    if (action === 'reset-upload') {
        resetUpload();
    }
    if (action === 'analyze-image') {
        analyzeImage();
    }
}

function handleResultsAction(event) {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.action;
    if (action === 'download-json') {
        downloadJson();
    }
    if (action === 'download-report') {
        downloadReport();
    }
}

renderDropzoneDefault();

if (dropzone) {
    dropzone.addEventListener('click', handleDropzoneAction);
    dropzone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropzone.style.borderColor = 'var(--primary-red)';
    });
    dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--border-gray)';
    });
    dropzone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropzone.style.borderColor = 'var(--border-gray)';
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            handleFile(event.target.files[0]);
        }
    });
}

if (resultsPanel) {
    resultsPanel.addEventListener('click', handleResultsAction);
}

document.addEventListener('click', (event) => {
    const navTarget = event.target.closest('[data-page]');
    if (!navTarget) return;
    event.preventDefault();
    showPage(navTarget.dataset.page);
});
