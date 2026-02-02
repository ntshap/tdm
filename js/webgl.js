/**
 * WebGL Module
 * Three.js scene with liquid noise shader effect
 */

import * as THREE from 'three';

// Shader code
const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vNoise;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0);
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        float noiseVal = snoise(position * 0.8 + uTime * 0.3);
        vNoise = noiseVal;
        vec3 newPos = position + normal * noiseVal * 0.4;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
`;

const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec3 vNormal;
    varying float vNoise;

    float dither8x8(vec2 position, float brightness) {
        int x = int(mod(position.x, 8.0));
        int y = int(mod(position.y, 8.0));
        int index = x + y * 8;
        float limit = fract(float(index) * 0.61803398875); 
        return brightness < limit ? 0.0 : 1.0;
    }

    void main() {
        vec3 lightPos = vec3(1.0, 1.0, 2.0);
        float diffuse = max(dot(vNormal, normalize(lightPos)), 0.0);
        float intensity = diffuse + (vNoise * 0.2) + 0.1;
        
        vec3 col = uColor1;
        vec2 screenPos = gl_FragCoord.xy;
        float d = dither8x8(screenPos, intensity);
        
        if (intensity > 0.6) { col = mix(uColor2, uColor3, d); }
        else if (intensity > 0.3) { col = mix(uColor1, uColor2, d); }
        else { col = uColor1 * d; }

        gl_FragColor = vec4(col, 1.0);
    }
`;

// Module state
let scene, camera, renderer, blob, clock;
let uniforms;

/**
 * Initialize the WebGL scene
 */
export function initWebGL() {
    const canvasContainer = document.getElementById('webgl-canvas');

    if (!canvasContainer) {
        console.warn('WebGL canvas container not found');
        return null;
    }

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Shader uniforms
    uniforms = {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#004d30') },
        uColor2: { value: new THREE.Color('#ff9ec6') },
        uColor3: { value: new THREE.Color('#ff6b4a') }
    };

    // Create material and mesh
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });

    const geometry = new THREE.SphereGeometry(2.2, 128, 128);
    blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // Clock for animation
    clock = new THREE.Clock();

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    return { blob, uniforms };
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    blob.rotation.y = t * 0.1;

    renderer.render(scene, camera);
}

/**
 * Handle window resize
 */
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Get the blob mesh for external manipulation
 */
export function getBlob() {
    return blob;
}

/**
 * Get uniforms for external manipulation
 */
export function getUniforms() {
    return uniforms;
}
