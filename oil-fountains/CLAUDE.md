# Claude Context: Oil Fountains

## Project Overview
Animated oil fountain simulation for three platforms: Web Browser, Windows Desktop (transparent overlay), and Android.

## Current Status
- **Browser version:** Complete - `index.html` + `fountain.js`
- **Windows desktop:** Complete - `oil_fountains.py` + `OilFountains.exe`
- **Android:** Complete - `OilFountains.apk`
- **Documentation:** Complete - `TUTORIAL.md`
- **GitHub:** Published with releases at https://github.com/ParisB81/oil-fountains
- **Last updated:** January 2026

## Technical Decisions

### Why Tkinter for Windows (not Pygame)?
- Pygame doesn't install on Python 3.14 (compatibility issues)
- Tkinter is built into Python, no installation needed
- Tkinter supports transparent windows via `-transparentcolor`

### Transparent Desktop Overlay (Windows)
```python
self.trans_color = '#abcdef'  # Magic color for transparency
self.root.configure(bg=self.trans_color)
self.root.wm_attributes('-transparentcolor', self.trans_color)
self.root.attributes('-topmost', True)
```
- Uses a specific color that becomes transparent
- Particles are drawn on canvas, background shows desktop

### Why Capacitor for Android?
- Wraps the web version (HTML5 Canvas) in a native WebView
- Reuses existing JavaScript code
- Simple build process with Android Studio

## Known Issues & Gotchas

### Android Dark Screen Issue (Fixed)
- Problem: App showed dark screen, no animation
- Cause: JavaScript ran before DOM was ready, `window.innerWidth` was 0
- Solution: Wait for `DOMContentLoaded`, add dimension fallbacks

### Windows Executable Size
- `OilFountains.exe` is ~11MB (PyInstaller bundles Python runtime)
- This is normal for standalone Python apps

### Stopping the Windows Overlay
- Click on a fountain, then press Escape
- Or use `Stop Fountains.bat`
- Or: `taskkill /f /im pythonw.exe`

## Key Files

### Browser Version
| File | Purpose |
|------|---------|
| `index.html` | HTML structure + CSS |
| `fountain.js` | Canvas animation + particle physics |

### Windows Version
| File | Purpose |
|------|---------|
| `oil_fountains.py` | Python/Tkinter transparent overlay |
| `Start Fountains.bat` | Launch script |
| `Stop Fountains.bat` | Kill script |
| `dist/OilFountains.exe` | Standalone executable |

### Android Version
| File | Purpose |
|------|---------|
| `www/` | Web files for Capacitor |
| `android/` | Android Studio project |
| `OilFountains.apk` | Built Android app |
| `capacitor.config.json` | Capacitor settings |

## Build Commands

### Windows Executable
```bash
python -m PyInstaller --onefile --windowed --name "OilFountains" oil_fountains.py
```

### Android APK
```bash
npx cap sync android
cd android && gradlew assembleDebug
```

## Animation Parameters
- Fountains: 3-5 depending on screen width
- Particles per fountain: 50-80
- Gravity: 0.15
- Frame rate: ~60 FPS via `requestAnimationFrame`

## Future Improvements (Ideas)
- Add color customization
- Different fountain patterns
- Sound effects
- Settings menu
