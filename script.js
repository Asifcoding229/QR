// QR Code Creator JavaScript Functionality

// DOM Elements
const contentTypeSelect = document.getElementById('content-type');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const qrCodeDisplay = document.getElementById('qr-code-display');
const downloadPngBtn = document.getElementById('download-png-btn');
const downloadSvgBtn = document.getElementById('download-svg-btn');
const currentYearSpan = document.getElementById('current-year');

// Input field containers
const textFields = document.getElementById('text-fields');
const urlFields = document.getElementById('url-fields');
const emailFields = document.getElementById('email-fields');
const phoneFields = document.getElementById('phone-fields');
const smsFields = document.getElementById('sms-fields');
const wifiFields = document.getElementById('wifi-fields');

// QR Code options
const qrSizeSelect = document.getElementById('qr-size');
const errorCorrectionSelect = document.getElementById('error-correction');
const foregroundColorInput = document.getElementById('foreground-color');
const backgroundColorInput = document.getElementById('background-color');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Initialize variables
let currentQrCode = null;
let qrCodeImage = null;

// Show/hide input fields based on content type
contentTypeSelect.addEventListener('change', function() {
    // Hide all input fields
    const allFields = [textFields, urlFields, emailFields, phoneFields, smsFields, wifiFields];
    allFields.forEach(field => field.style.display = 'none');
    
    // Show selected input field
    const selectedType = this.value;
    switch(selectedType) {
        case 'text':
            textFields.style.display = 'block';
            break;
        case 'url':
            urlFields.style.display = 'block';
            break;
        case 'email':
            emailFields.style.display = 'block';
            break;
        case 'phone':
            phoneFields.style.display = 'block';
            break;
        case 'sms':
            smsFields.style.display = 'block';
            break;
        case 'wifi':
            wifiFields.style.display = 'block';
            break;
    }
});

// Generate QR Code
generateBtn.addEventListener('click', function() {
    const contentType = contentTypeSelect.value;
    let content = '';
    
    // Get content based on selected type
    switch(contentType) {
        case 'text':
            content = document.getElementById('text-input').value;
            break;
        case 'url':
            content = document.getElementById('url-input').value;
            if (content && !content.startsWith('http')) {
                content = 'https://' + content;
            }
            break;
        case 'email':
            const email = document.getElementById('email-address').value;
            const subject = document.getElementById('email-subject').value;
            const body = document.getElementById('email-body').value;
            
            content = `mailto:${email}`;
            if (subject || body) {
                content += '?';
                if (subject) content += `subject=${encodeURIComponent(subject)}`;
                if (subject && body) content += '&';
                if (body) content += `body=${encodeURIComponent(body)}`;
            }
            break;
        case 'phone':
            const phone = document.getElementById('phone-input').value;
            content = `tel:${phone}`;
            break;
        case 'sms':
            const smsNumber = document.getElementById('sms-number').value;
            const smsMessage = document.getElementById('sms-message').value;
            
            content = `smsto:${smsNumber}`;
            if (smsMessage) {
                content += `:${smsMessage}`;
            }
            break;
        case 'wifi':
            const ssid = document.getElementById('wifi-ssid').value;
            const password = document.getElementById('wifi-password').value;
            const encryption = document.getElementById('wifi-encryption').value;
            const hidden = document.getElementById('wifi-hidden').checked;
            
            content = 'WIFI:';
            content += `S:${ssid};`;
            content += `T:${encryption};`;
            if (encryption !== 'nopass') {
                content += `P:${password};`;
            }
            if (hidden) {
                content += 'H:true;';
            }
            content += ';';
            break;
    }
    
    // Validate content
    if (!content) {
        alert('Please enter content for the QR code');
        return;
    }
    
    // Get QR code options
    const size = parseInt(qrSizeSelect.value);
    const errorCorrection = errorCorrectionSelect.value;
    const foregroundColor = foregroundColorInput.value;
    const backgroundColor = backgroundColorInput.value;
    
    // Generate QR code
    generateQRCode(content, size, errorCorrection, foregroundColor, backgroundColor);
});

// Reset form
resetBtn.addEventListener('click', function() {
    // Reset all input fields
    const allInputs = document.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
        if (input.type === 'color') {
            if (input.id === 'foreground-color') {
                input.value = '#000000';
            } else if (input.id === 'background-color') {
                input.value = '#FFFFFF';
            }
        } else if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Reset selects
    contentTypeSelect.value = 'text';
    qrSizeSelect.value = '256';
    errorCorrectionSelect.value = 'M';
    
    // Show text fields, hide others
    const allFields = [textFields, urlFields, emailFields, phoneFields, smsFields, wifiFields];
    allFields.forEach(field => field.style.display = 'none');
    textFields.style.display = 'block';
    
    // Clear QR code
    clearQRCode();
});

// Generate QR Code function
function generateQRCode(content, size, errorCorrection, foregroundColor, backgroundColor) {
    // Clear previous QR code
    clearQRCode();
    
    // Create QR Code
    const typeNumber = 0; // Auto-detect
    const qr = qrcode(typeNumber, errorCorrection);
    qr.addData(content);
    qr.make();
    
    // Create SVG
    const svgString = qr.createSvgTag({
        scalable: true,
        margin: 4,
        cellSize: 8,
        color: foregroundColor,
        background: backgroundColor
    });
    
    // Display QR code
    qrCodeDisplay.innerHTML = svgString;
    qrCodeDisplay.classList.add('fade-in');
    
    // Get the SVG element
    const svgElement = qrCodeDisplay.querySelector('svg');
    svgElement.setAttribute('width', `${size}px`);
    svgElement.setAttribute('height', `${size}px`);
    
    // Store current QR code
    currentQrCode = {
        svg: svgString,
        content: content,
        size: size
    };
    
    // Enable download buttons
    downloadPngBtn.disabled = false;
    downloadSvgBtn.disabled = false;
    
    // Setup download handlers
    setupDownloadHandlers();
}

// Clear QR Code
function clearQRCode() {
    qrCodeDisplay.innerHTML = `
        <div class="placeholder">
            <p>Your QR code will appear here</p>
        </div>
    `;
    qrCodeDisplay.classList.remove('fade-in');
    
    // Disable download buttons
    downloadPngBtn.disabled = true;
    downloadSvgBtn.disabled = true;
    
    // Reset current QR code
    currentQrCode = null;
}

// Setup download handlers
function setupDownloadHandlers() {
    // PNG Download
    downloadPngBtn.addEventListener('click', function() {
        if (!currentQrCode) return;
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const size = currentQrCode.size;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = backgroundColorInput.value;
        ctx.fillRect(0, 0, size, size);
        
        // Draw SVG on canvas
        const svgBlob = new Blob([currentQrCode.svg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        
        img.onload = function() {
            ctx.drawImage(img, 0, 0, size, size);
            URL.revokeObjectURL(url);
            
            // Convert canvas to PNG and download
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        
        img.src = url;
    });
    
    // SVG Download
    downloadSvgBtn.addEventListener('click', function() {
        if (!currentQrCode) return;
        
        // Create SVG blob and download
        const svgBlob = new Blob([currentQrCode.svg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'qrcode.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    });
}

// Initialize the app
function init() {
    // Show text fields by default
    textFields.style.display = 'block';
    
    // Disable download buttons initially
    downloadPngBtn.disabled = true;
    downloadSvgBtn.disabled = true;
}

// Run initialization
init();
