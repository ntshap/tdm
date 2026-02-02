/**
 * Custom Cursor Module
 * Handles the custom cursor movement and hover effects
 */

export function initCursor() {
    const cursor = document.getElementById('cursor');

    if (!cursor) {
        console.warn('Cursor element not found');
        return;
    }

    // Track cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('.cursor-hover, a, button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
}
