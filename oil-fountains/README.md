# Oil Fountains Animation

A visually appealing animated oil fountain simulation featuring multiple fountains with dark, glossy particles shooting upward and falling back down.

Available for **Web Browser**, **Windows Desktop**, and **Android**.

## Platforms

### 🌐 Web Browser
Simply double-click `index.html` to open it in your default web browser, or use a local server for the best experience.

**Using Python:**
```bash
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

**Using Node.js:**
```bash
npx http-server
# Then open http://localhost:8080 in your browser
```

**Using VS Code:**
Install the "Live Server" extension and click "Go Live" in the status bar.

### 💻 Windows Desktop (Transparent Overlay)
Download from [Releases](https://github.com/ParisB81/oil-fountains/releases) or run:
- Double-click `Start Fountains.bat`
- Or run: `pythonw oil_fountains.py`

**Special feature:** Transparent background shows your desktop wallpaper and icons behind the fountains!

**To stop:** Click on a fountain, then press Escape. Or use `Stop Fountains.bat`.

### 📱 Android
Download `OilFountains.apk` from [Releases](https://github.com/ParisB81/oil-fountains/releases) and install on your Android device.

You may need to enable "Install from unknown sources" in your Android settings.

## Features

- Multiple animated oil fountains
- Dark, glossy oil-colored particles
- Realistic gravity and physics simulation
- Responsive design - adapts to window size
- Smooth particle trail effects
- Metallic fountain nozzles with pool bases

## Technical Details

### Browser Version
- `index.html` - Main HTML file with canvas element
- `fountain.js` - JavaScript animation logic
- Colored background (customizable)

### Windows Desktop Version
- `oil_fountains.py` - Python/Tkinter transparent overlay
- `OilFountains.exe` - Standalone executable (no Python needed)
- `Start Fountains.bat` / `Stop Fountains.bat` - Launch/kill scripts
- **Unique feature:** Transparent background using Tkinter's `-transparentcolor`

### Android Version
- Built with Capacitor (wraps web version in native WebView)
- `OilFountains.apk` - Android app package
- Black background (Android apps cannot be transparent over home screen)
- Full-screen immersive mode

## Browser Support

Works in all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge

## Documentation

- `README.md` - This file
- `TUTORIAL.md` - Detailed tutorial for building the project
- `CLAUDE.md` - Technical context and development notes
