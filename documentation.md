# QR Code Creator - User Documentation

## Overview
The QR Code Creator is a web-based application that allows you to generate QR codes for various types of content. This tool provides a simple and intuitive interface for creating customized QR codes that can be downloaded and used in your projects.

## Features
- Generate QR codes for multiple content types:
  - Plain text
  - URLs
  - Email addresses (with optional subject and body)
  - Phone numbers
  - SMS messages
  - WiFi network credentials
- Customize QR code appearance:
  - Size options (small, medium, large)
  - Error correction levels
  - Foreground and background colors
- Download options:
  - PNG format (raster image)
  - SVG format (vector image)

## How to Use

### Installation
1. Extract the contents of the `qr-code-creator.zip` file to a folder on your computer.
2. Open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge, etc.).

### Generating QR Codes

1. **Select Content Type**
   - Choose the type of content you want to encode in your QR code from the dropdown menu.

2. **Enter Content Details**
   - For Text: Enter any text you want to encode.
   - For URL: Enter a web address (https://example.com).
   - For Email: Enter email address, optional subject, and body.
   - For Phone: Enter a phone number with country code.
   - For SMS: Enter a phone number and message.
   - For WiFi: Enter network name (SSID), password, encryption type, and whether it's hidden.

3. **Customize QR Code (Optional)**
   - Size: Choose between small (128x128), medium (256x256), or large (512x512).
   - Error Correction: Select the level of error correction (affects QR code's ability to remain readable if damaged).
   - Colors: Customize foreground (QR code pattern) and background colors.

4. **Generate QR Code**
   - Click the "Generate QR Code" button to create your QR code.
   - The QR code will appear in the display area on the right.

5. **Download QR Code**
   - Click "Download PNG" for a raster image format.
   - Click "Download SVG" for a vector image format (scalable without quality loss).

6. **Reset Form**
   - Click the "Reset" button to clear all inputs and start over.

## Technical Information
- The application runs entirely in your browser - no internet connection required after downloading.
- Uses the qrcode-generator JavaScript library for QR code generation.
- Compatible with all modern web browsers.
- No data is sent to any server; all processing happens locally on your device.

## Tips for QR Code Usage
- Test your QR codes with multiple scanning apps to ensure compatibility.
- Higher error correction levels make QR codes more resilient but also more dense.
- For marketing materials, consider using custom colors that match your brand.
- Ensure sufficient contrast between foreground and background colors for better scanning.
- For printed materials, use the SVG format for best quality at any size.

## Troubleshooting
- If a QR code doesn't scan, try increasing the size or error correction level.
- Ensure there's adequate lighting when scanning QR codes.
- Some older QR code scanners may have trouble with custom-colored QR codes.
- If WiFi QR codes don't work, check that your device's scanner supports WiFi network QR codes.

## Privacy & Security
This application runs entirely on your local device. No data is transmitted to any external servers, ensuring your information remains private and secure.
