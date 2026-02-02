# CONFERA 2026

> The Future of Generative Art — Premium Landing Page

## 🎨 Overview

CONFERA 2026 is a stunning, high-fidelity landing page for a generative art conference. Built with modern web technologies and featuring impressive visual effects including WebGL shaders, GSAP animations, and a custom cursor system.

## 🚀 Tech Stack

- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN) + Custom CSS
- **3D Graphics**: Three.js with custom GLSL shaders
- **Animations**: GSAP with ScrollTrigger
- **Typography**: Google Fonts (Anton, Space Grotesk)

## 📁 Project Structure

```
TDM/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom CSS with design tokens
├── js/
│   ├── main.js         # Entry point
│   ├── cursor.js       # Custom cursor module
│   ├── webgl.js        # Three.js WebGL scene
│   └── animations.js   # GSAP animations
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
└── README.md           # Documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **Liquid Noise Shader**: Animated 3D blob with dithering effect
- **Custom Cursor**: Mix-blend-mode cursor with hover states
- **Scroll Animations**: Color-shifting WebGL based on scroll position
- **Responsive Design**: Mobile-first approach
- **CSS Effects**: Noise overlay, scanlines, grid patterns

## 🎯 Sections

1. **Hero** - Manifesto section with animated blob background
2. **Sponsors Marquee** - Infinite scroll company logos
3. **About (Ticket Stub)** - Event details with progress bar
4. **Tracks** - Conference tracks with hover effects
5. **Speakers** - Horizontal scrolling speaker cards
6. **Agenda** - Day-by-day schedule with tabs
7. **Venue** - CSS-art map with location info
8. **Pricing** - Three-tier pricing cards
9. **FAQ** - Accordion-style questions
10. **Testimonials** - Community feedback
11. **Footer** - Newsletter signup & links

## 📝 License

MIT License - Feel free to use for personal or commercial projects.
