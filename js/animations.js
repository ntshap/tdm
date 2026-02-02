/**
 * Animations Module
 * GSAP ScrollTrigger animations for the page
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all scroll-triggered animations
 * @param {Object} webglData - Object containing blob mesh and uniforms from WebGL module
 */
export function initAnimations(webglData) {
    if (!webglData) {
        console.warn('WebGL data not provided, skipping color animations');
        initBasicAnimations();
        return;
    }

    const { blob, uniforms } = webglData;

    initColorShiftAnimations(uniforms);
    initBlobScrollAnimation(blob);
    initBasicAnimations();
}

/**
 * Color shift animations based on scroll position
 */
function initColorShiftAnimations(uniforms) {
    const sections = [
        { id: "#resources", c1: '#f4f4f0', c2: '#004d30', c3: '#ff6b4a' },
        { id: "#pricing", c1: '#f4f4f0', c2: '#ff9ec6', c3: '#000000' },
        { id: "#roadmap", c1: '#ff9ec6', c2: '#ff6b4a', c3: '#ffffff' },
        { id: "#platform", c1: '#ffffff', c2: '#000000', c3: '#ffffff' },
        { id: "#faq", c1: '#004d30', c2: '#ffffff', c3: '#004d30' }
    ];

    // Default colors
    const defaultColors = {
        c1: '#004d30',
        c2: '#ff9ec6',
        c3: '#ff6b4a'
    };

    sections.forEach(section => {
        const element = document.querySelector(section.id);
        if (!element) return;

        ScrollTrigger.create({
            trigger: section.id,
            start: "top center",
            end: "bottom center",
            onEnter: () => animateColors(uniforms, section.c1, section.c2, section.c3),
            onLeaveBack: () => animateColors(uniforms, defaultColors.c1, defaultColors.c2, defaultColors.c3)
        });
    });
}

/**
 * Animate color uniforms
 */
function animateColors(uniforms, c1, c2, c3) {
    const color1 = new THREE.Color(c1);
    const color2 = new THREE.Color(c2);
    const color3 = new THREE.Color(c3);

    gsap.to(uniforms.uColor1.value, {
        r: color1.r,
        g: color1.g,
        b: color1.b,
        duration: 1
    });

    gsap.to(uniforms.uColor2.value, {
        r: color2.r,
        g: color2.g,
        b: color2.b,
        duration: 1
    });

    gsap.to(uniforms.uColor3.value, {
        r: color3.r,
        g: color3.g,
        b: color3.b,
        duration: 1
    });
}

/**
 * Blob scroll animation
 */
function initBlobScrollAnimation(blob) {
    gsap.to(blob.position, {
        y: -1.5,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    });
}

/**
 * Basic element animations
 */
function initBasicAnimations() {
    // Pricing cards animation
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards.length > 0) {
        gsap.from(".pricing-card", {
            y: 100,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: "#pricing",
                start: "top 70%"
            }
        });
    }

    // FAQ items animation
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        gsap.from(".faq-item", {
            x: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            scrollTrigger: {
                trigger: "#faq",
                start: "top 70%"
            }
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
export function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}
