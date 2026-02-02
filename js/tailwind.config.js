/**
 * Tailwind Configuration
 * Extracted from index.html for cleaner structure
 * Loaded AFTER Tailwind CDN
 */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-green': '#004d30',
                'brand-pink': '#ff9ec6',
                'brand-orange': '#ff6b4a',
                'brand-dark': '#0a0a0a',
                'brand-light': '#f4f4f0',
                'brand-blue': '#2b2d42',
            },
            fontFamily: {
                'display': ['Anton', 'sans-serif'],
                'body': ['Space Grotesk', 'sans-serif'],
            },
            backgroundImage: {
                'grid-white': "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                'grid-black': "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
            },
            boxShadow: {
                'hard': '6px 6px 0px 0px rgba(0,0,0,1)',
                'hard-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
                'hard-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'marquee': 'marquee 30s linear infinite',
                'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        }
    }
}
