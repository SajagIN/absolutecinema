# Absolute Cinema

A browser-based canvas recreation of the classic “Bad Apple!!” animation, built for Hack Club’s **You Ship We Ship (YSWS)** program.

## Features

- **Pure HTML5 Canvas** rendering of each frame
- Grayscale → binary pixel mapping for minimal, retro aesthetic  
- Overlaid “focus” window with drop‑shadow effect  
- Smooth scrolling credits section  

## Getting Started

1. **Clone** this repo  
   ```bash
   git clone https://github.com/SajagIN/absolutecinema.git
   cd absolutecinema
   ```
2. **Serve** with any static HTTP server
   ```bash python3 -m http.server 8000 ```
   Then open http://localhost:8000 in your browser.
3. **Enjoy** the animation!

## Project Structure
    absolutecinema/
    ├── bad_apple_frames.json # Minified JSON frame data
    ├── frame_creator.js      # Creates a Minified JSON from video
    ├── index.html
    ├── package.json
    └── script.js
    
## Credits

- **Animation:** Bad Apple!! feat. nomico (Alstroemeria Records)
- **Hack Club:** You Ship We Ship (YSWS) 🛳
- **Project:** Cinema YSWS
- **Processing:** FFmpeg, Sharp
