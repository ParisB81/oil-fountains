# Oil Fountains - Complete Development Tutorial

This tutorial documents the complete process of building an animated oil fountain application for three platforms: Web Browser, Windows Desktop, and Android.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Environment Setup](#development-environment-setup)
3. [Prerequisites & Software Installation](#prerequisites--software-installation)
4. [Part 1: Browser Version (HTML5 Canvas)](#part-1-browser-version-html5-canvas)
5. [Part 2: Windows Desktop Version (Python/Tkinter)](#part-2-windows-desktop-version-pythontkinter)
6. [Part 3: Android Version (Capacitor)](#part-3-android-version-capacitor)
7. [Project Structure](#project-structure)
8. [Publishing to GitHub](#publishing-to-github)

---

## Project Overview

### What We Built

An animated oil fountain simulation featuring:
- Multiple fountains shooting dark oil particles upward
- Realistic gravity and particle physics
- Glossy oil droplet effects with highlights
- Interactive touch/click to boost fountains

### Three Platform Versions

| Platform | Technology | Output |
|----------|------------|--------|
| Web Browser | HTML5 Canvas + JavaScript | `index.html` |
| Windows Desktop | Python + Tkinter | `OilFountains.exe` |
| Android | Capacitor (WebView wrapper) | `OilFountains.apk` |

---

## Development Environment Setup

This project was built using **Claude Code** (Anthropic's AI coding assistant) integrated with **VS Code**. Here's how to set up the same environment.

### Core Development Tools

#### 1. Visual Studio Code
- **Download:** https://code.visualstudio.com
- **Purpose:** Primary code editor and IDE
- **Why:** Excellent integration with extensions, terminals, and AI assistants

#### 2. Claude Code (AI Assistant)
- **Website:** https://claude.ai/claude-code
- **Purpose:** AI-powered coding assistant that can write, edit, and run code
- **Installation:**
  ```bash
  npm install -g @anthropic-ai/claude-code
  ```
- **Features used in this project:**
  - Writing and editing code files
  - Running terminal commands
  - Git operations (commit, push, create releases)
  - File system navigation
  - Debugging and troubleshooting

#### 3. Git for Windows
- **Download:** https://git-scm.com/download/win
- **Purpose:** Version control system
- **Includes:** Git Bash terminal (Unix-like shell on Windows)
- **Configuration after install:**
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

#### 4. GitHub CLI (gh)
- **Download:** https://cli.github.com
- **Purpose:** Command-line interface for GitHub operations
- **Installation:** Download installer from website and run
- **Authentication:**
  ```bash
  gh auth login
  ```
  This opens a browser to authenticate with your GitHub account.
- **Features used:**
  - `gh repo create` - Create new repositories
  - `gh release create` - Create releases with binary uploads
  - `gh release upload` - Update release assets

### VS Code Extensions (Recommended)

While not strictly required, these extensions enhance the development experience:

| Extension | Purpose |
|-----------|---------|
| Python | Python language support, debugging |
| Live Server | Quick local server for HTML testing |
| GitLens | Enhanced Git integration |
| Prettier | Code formatting |

### Terminal Environment

The project was developed using **Git Bash** terminal within VS Code, which provides Unix-like commands on Windows:

- `ls` - List files
- `cp` - Copy files
- `mkdir` - Create directories
- `cd` - Change directory

**To set Git Bash as default terminal in VS Code:**
1. Open VS Code Settings (Ctrl+,)
2. Search for "terminal default profile windows"
3. Select "Git Bash"

### GitHub Account Setup

1. Create account at https://github.com
2. Create a new repository (can be done via web or CLI)
3. For CLI repository creation:
   ```bash
   gh repo create oil-fountains --public
   ```

### How Claude Code Interacts with the Environment

Claude Code operates through the terminal and file system:

```
┌─────────────────────────────────────────────────────────┐
│                    VS Code                               │
│  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   File Editor   │  │   Claude Code Extension     │  │
│  │                 │  │                             │  │
│  │  - View files   │  │  - Read/Write files         │  │
│  │  - Edit code    │  │  - Run terminal commands    │  │
│  │                 │  │  - Git operations           │  │
│  └─────────────────┘  └─────────────────────────────┘  │
│                              │                          │
│                              ▼                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Terminal (Git Bash)                 │   │
│  │                                                  │   │
│  │  $ python script.py                             │   │
│  │  $ npm install                                  │   │
│  │  $ git commit -m "message"                      │   │
│  │  $ gh release create                            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Key capabilities:**
- **File Operations:** Create, read, edit, delete files
- **Terminal Commands:** Run any shell command (build tools, git, npm, etc.)
- **Process Management:** Start/stop background processes
- **Web Fetching:** Download files, check documentation

---

## Prerequisites & Software Installation

### Required Software

#### 1. Python (for Windows Desktop version)
- **Download:** https://python.org
- **Version used:** Python 3.14
- **Purpose:** Running the desktop overlay application

#### 2. Node.js & npm (for Android version)
- **Download:** https://nodejs.org
- **Version:** LTS recommended (v18+)
- **Purpose:** Running Capacitor CLI to build Android app

#### 3. Android Studio (for Android version)
- **Download:** https://developer.android.com/studio
- **Size:** ~1GB download
- **Purpose:** Building the Android APK
- **Note:** Includes Java JDK (required for Gradle builds)

#### 4. Git (for version control)
- **Download:** https://git-scm.com
- **Purpose:** Version control and pushing to GitHub

#### 5. GitHub CLI (optional, for releases)
- **Download:** https://cli.github.com
- **Purpose:** Creating GitHub releases from command line

### Python Libraries Installed

```bash
pip install pyinstaller
```

- **PyInstaller:** Converts Python scripts into standalone executables

### Node.js Packages Installed

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

- **@capacitor/core:** Capacitor runtime
- **@capacitor/cli:** Command-line tools for Capacitor
- **@capacitor/android:** Android platform support

---

## Part 1: Browser Version (HTML5 Canvas)

### Architecture

The browser version uses pure HTML5 Canvas with vanilla JavaScript. No frameworks or build tools required.

```
index.html          # HTML structure + CSS styling
    └── fountain.js # JavaScript animation logic
```

### Key Concepts

1. **Canvas Setup:** Full-screen canvas element
2. **Particle System:** Each fountain contains ~50-80 particle objects
3. **Animation Loop:** Uses `requestAnimationFrame()` for smooth 60fps animation
4. **Physics:** Simple gravity simulation (velocity += gravity each frame)

### Files

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#0f0f23">
    <title>Oil Fountains</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            touch-action: none;
        }
        body {
            background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
        }
        canvas { display: block; touch-action: none; }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script src="fountain.js"></script>
</body>
</html>
```

#### fountain.js (Core Logic)

Key classes:
- **Particle:** Individual oil droplet with position, velocity, size, color, life
- **Fountain:** Collection of particles originating from one nozzle

Key functions:
- **init():** Initialize canvas and start animation
- **resizeCanvas():** Handle window/orientation changes
- **animate():** Main animation loop (clear, update, draw)
- **initFountains():** Create fountain objects based on screen width

### How to Run

Simply open `index.html` in any modern web browser.

---

## Part 2: Windows Desktop Version (Python/Tkinter)

### Architecture

Uses Python's built-in Tkinter library with Windows API calls for transparency.

```
oil_fountains.py    # Main Python script
    ├── Tkinter     # GUI framework (built into Python)
    └── ctypes      # Windows API calls for transparency
```

### Key Concepts

1. **Transparent Window:** Uses `-transparentcolor` attribute to make background invisible
2. **Desktop Overlay:** Window is borderless and fullscreen, positioned on top
3. **Click-through:** Users can interact with desktop behind the animation
4. **Particle System:** Same physics as browser version, ported to Python

### Key Code Sections

#### Transparent Window Setup
```python
self.trans_color = '#abcdef'
self.root.configure(bg=self.trans_color)
self.root.wm_attributes('-transparentcolor', self.trans_color)
self.root.attributes('-topmost', True)
```

#### Animation Loop
```python
def animate(self):
    self.canvas.delete("all")
    for fountain in self.fountains:
        fountain.update()
        fountain.draw()
    self.root.after(16, self.animate)  # ~60 FPS
```

### Creating the Executable

```bash
# Install PyInstaller
pip install pyinstaller

# Build executable
cd oil-fountains
python -m PyInstaller --onefile --windowed --name "OilFountains" oil_fountains.py
```

**Flags explained:**
- `--onefile`: Bundle everything into single .exe
- `--windowed`: No console window
- `--name`: Output filename

**Output:** `dist/OilFountains.exe` (11MB)

### Batch Files for Easy Use

**Start Fountains.bat:**
```batch
@echo off
start "" pythonw "C:\00 Paris\oil-fountains\oil_fountains.py"
```

**Stop Fountains.bat:**
```batch
@echo off
taskkill /f /im pythonw.exe 2>nul
taskkill /f /im python.exe 2>nul
```

---

## Part 3: Android Version (Capacitor)

### Architecture

Capacitor wraps the web version (HTML/JS) in a native Android WebView.

```
www/                    # Web assets (copied from root)
    ├── index.html
    └── fountain.js
android/                # Native Android project
    ├── app/
    │   ├── src/main/
    │   │   ├── assets/public/    # Web files go here
    │   │   ├── java/.../MainActivity.java
    │   │   └── res/              # Icons, splash screens
    │   └── build.gradle
    └── gradle/
capacitor.config.json   # Capacitor configuration
package.json            # Node.js dependencies
```

### Step-by-Step Build Process

#### Step 1: Initialize npm Project
```bash
cd oil-fountains
npm init -y
```

#### Step 2: Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

#### Step 3: Initialize Capacitor
```bash
npx cap init "Oil Fountains" com.yourname.oilfountains --web-dir www
```

This creates `capacitor.config.json`:
```json
{
  "appId": "com.yourname.oilfountains",
  "appName": "Oil Fountains",
  "webDir": "www"
}
```

#### Step 4: Prepare Web Files
```bash
mkdir www
cp index.html www/
cp fountain.js www/
```

#### Step 5: Add Android Platform
```bash
npx cap add android
```

#### Step 6: Sync Web Files to Android
```bash
npx cap sync android
```
Run this after any changes to web files.

#### Step 7: Build APK

**Option A: Using Android Studio**
```bash
npx cap open android
```
Then: Build → Build Bundle(s) / APK(s) → Build APK(s)

**Option B: Command Line (requires JAVA_HOME)**
```bash
cd android
JAVA_HOME="/path/to/android-studio/jbr" ./gradlew assembleDebug
```

On Windows with Android Studio installed:
```bash
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
gradlew.bat assembleDebug
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk` (4MB)

### Mobile-Specific Adaptations

The JavaScript needed modifications for mobile:

1. **Wait for DOM:** Wrap initialization in `DOMContentLoaded`
2. **Touch Events:** Add touch handlers alongside click
3. **Viewport Fallbacks:** Handle cases where `window.innerWidth` is 0
4. **Performance:** Reduce particle count on mobile

```javascript
document.addEventListener('DOMContentLoaded', init);

function resizeCanvas() {
    screenWidth = window.innerWidth || document.documentElement.clientWidth || 360;
    screenHeight = window.innerHeight || document.documentElement.clientHeight || 640;
    // ...
}
```

---

## Project Structure

```
C:\00 Paris\oil-fountains\
│
├── index.html              # Browser version - HTML
├── fountain.js             # Browser version - JavaScript
│
├── oil_fountains.py        # Windows desktop version
├── Start Fountains.bat     # Windows - start script
├── Stop Fountains.bat      # Windows - stop script
│
├── www/                    # Web files for Capacitor
│   ├── index.html
│   └── fountain.js
│
├── android/                # Android project (generated)
│   ├── app/
│   ├── gradle/
│   ├── build.gradle
│   └── gradlew
│
├── dist/                   # PyInstaller output
│   └── OilFountains.exe    # Windows executable
│
├── build/                  # PyInstaller temp files
├── node_modules/           # npm packages
│
├── capacitor.config.json   # Capacitor config
├── package.json            # npm config
├── package-lock.json
│
├── OilFountains.apk        # Android app (copied from build)
├── OilFountains.exe        # Windows app (copied from dist)
│
├── .gitignore              # Git ignore rules
├── README.md               # Basic readme
└── TUTORIAL.md             # This file
```

### What's in .gitignore

```
node_modules/
dist/
build/
*.apk
*.exe
www/
android/app/build/
android/build/
android/.gradle/
android/.idea/
*.spec
```

These are build artifacts that can be regenerated.

---

## Publishing to GitHub

### Initial Setup

```bash
# Initialize git repo
git init

# Add files
git add .

# First commit
git commit -m "Initial commit: Oil Fountains app"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/oil-fountains.git

# Push
git push -u origin master
```

### Creating a Release with Binaries

```bash
# Login to GitHub CLI
gh auth login

# Create release with files
gh release create v1.0.0 OilFountains.exe OilFountains.apk \
  --title "Oil Fountains v1.0.0" \
  --notes "Download OilFountains.exe for Windows or OilFountains.apk for Android"
```

### Updating a Release

```bash
gh release upload v1.0.0 OilFountains.apk --clobber
```

---

## Troubleshooting

### Windows Version

**Issue:** Fountains don't appear
**Solution:** Check that Python and Tkinter are installed correctly

**Issue:** Can't close the app
**Solution:** Click on a fountain, press Escape, or run `Stop Fountains.bat`

### Android Version

**Issue:** Dark screen, no animation
**Solutions:**
- Ensure `www/` folder contains the latest web files
- Run `npx cap sync android` after changes
- Check that JavaScript waits for DOM to load

**Issue:** JAVA_HOME not set
**Solution:** Point to Android Studio's bundled JDK:
```
C:\Program Files\Android\Android Studio\jbr
```

**Issue:** Gradle build fails
**Solution:** Open project in Android Studio and let it sync first

---

## Summary

| Component | Technology | Command to Build |
|-----------|------------|------------------|
| Browser | HTML5/JS | Just open `index.html` |
| Windows | Python/Tkinter | `pyinstaller --onefile --windowed oil_fountains.py` |
| Android | Capacitor | `npx cap sync && gradlew assembleDebug` |

**Total Development Time:** ~2 hours

**Final Outputs:**
- `OilFountains.exe` (11MB) - Windows
- `OilFountains.apk` (4MB) - Android
- `index.html` - Any web browser

---

*Tutorial created: January 2026*
*GitHub: https://github.com/ParisB81/oil-fountains*
