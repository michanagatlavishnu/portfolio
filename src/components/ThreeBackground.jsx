import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Setup Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true, // Transparent canvas to allow CSS gradients to show through
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Plexus Parameters
    const maxParticles = 65; // Minimal count for a spacious, clean appearance
    const maxDistance = 7;   // Maximum distance to draw a connection line
    const boundsSize = 25;   // Physical bounding volume size for particles

    // Data buffers
    const positions = new Float32Array(maxParticles * 3);
    const velocities = [];

    // Create a round node dot texture dynamically
    const createCircleTexture = () => {
      const size = 32;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.fillStyle = '#000000'; // Pure black nodes
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    // Initialize particle positions and velocities
    for (let i = 0; i < maxParticles; i++) {
      positions[i * 3] = Math.random() * boundsSize - boundsSize / 2;
      positions[i * 3 + 1] = Math.random() * boundsSize - boundsSize / 2;
      positions[i * 3 + 2] = Math.random() * boundsSize - boundsSize / 2;

      // Slow, organic drift speed
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04
      ));
    }

    // 3. Setup Particles Mesh
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      alphaTest: 0.5 // Cut off transparent edges cleanly to ensure only the circle renders
    });

    const particlePositions = new THREE.Points(particlesGeometry, particlesMaterial);

    // 4. Setup Line Segments (Plexus Links)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxParticles * maxParticles * 3);
    const lineColors = new Float32Array(maxParticles * maxParticles * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    // Semi-transparent lines
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.NormalBlending
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

    // Group container for collective matrix rotation
    const group = new THREE.Group();
    group.add(particlePositions);
    group.add(linesMesh);
    scene.add(group);

    // 5. Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    // 6. Scroll tracking
    let scrollY = 0;
    let targetScrollY = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 7. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array;
      let linePosIdx = 0;
      let lineColorIdx = 0;
      let numConnected = 0;

      // Update particle coordinates (bounce off spatial boundaries)
      for (let i = 0; i < maxParticles; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        if (posArray[i * 3] < -boundsSize / 2 || posArray[i * 3] > boundsSize / 2) velocities[i].x = -velocities[i].x;
        if (posArray[i * 3 + 1] < -boundsSize / 2 || posArray[i * 3 + 1] > boundsSize / 2) velocities[i].y = -velocities[i].y;
        if (posArray[i * 3 + 2] < -boundsSize / 2 || posArray[i * 3 + 2] > boundsSize / 2) velocities[i].z = -velocities[i].z;
      }

      // Check distance thresholds and establish line coordinates
      for (let i = 0; i < maxParticles; i++) {
        const ax = posArray[i * 3];
        const ay = posArray[i * 3 + 1];
        const az = posArray[i * 3 + 2];

        for (let j = i + 1; j < maxParticles; j++) {
          const bx = posArray[j * 3];
          const by = posArray[j * 3 + 1];
          const bz = posArray[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Start node coordinates
            linePositions[linePosIdx++] = ax;
            linePositions[linePosIdx++] = ay;
            linePositions[linePosIdx++] = az;
            
            // End node coordinates
            linePositions[linePosIdx++] = bx;
            linePositions[linePosIdx++] = by;
            linePositions[linePosIdx++] = bz;

            // Set color segment arrays (pure black: 0, 0, 0)
            lineColors[lineColorIdx++] = 0;
            lineColors[lineColorIdx++] = 0;
            lineColors[lineColorIdx++] = 0;
            lineColors[lineColorIdx++] = 0;
            lineColors[lineColorIdx++] = 0;
            lineColors[lineColorIdx++] = 0;

            numConnected++;
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Draw only elements containing connections
      lineGeometry.setDrawRange(0, numConnected * 2);

      // Inertia rotations (slow drift + cursor tracking)
      const time = Date.now() * 0.0001;
      group.rotation.y = time * 0.15;
      group.rotation.x = time * 0.08;

      targetX = mouseX * 0.08;
      targetY = mouseY * 0.08;
      group.rotation.y += (targetX - group.rotation.y) * 0.05;
      group.rotation.x += (targetY - group.rotation.x) * 0.05;

      // Scroll depth shift - dynamic and visible scroll zoom, safely capped
      scrollY += (targetScrollY - scrollY) * 0.1;
      group.position.z = Math.min(scrollY * 0.01, 12);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      particlesGeometry.dispose();
      lineGeometry.dispose();
      particlesMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
