/**
 * Main Application Entry Point
 * CONFERA 2026 - The Future of Generative Art
 */

import { initCursor } from './cursor.js';
import { initWebGL } from './webgl.js';
import { initAnimations, initFAQAccordion } from './animations.js';

// Import styles
import '../css/styles.css';

/**
 * Initialize the application
 */
function init() {
    initCursor();
    const webglData = initWebGL();
    initAnimations(webglData);
    initFAQAccordion();
    console.log('CONFERA 2026 initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
