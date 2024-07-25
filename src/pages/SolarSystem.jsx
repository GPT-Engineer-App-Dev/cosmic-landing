import React, { useRef, useEffect } from 'react';

const SolarSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Planet data
    const planets = [
      { name: 'Sun', color: '#FDB813', radius: 50, orbitRadius: 0, speed: 0 },
      { name: 'Mercury', color: '#B5B8B1', radius: 5, orbitRadius: 80, speed: 0.04 },
      { name: 'Venus', color: '#E6C522', radius: 8, orbitRadius: 120, speed: 0.015 },
      { name: 'Earth', color: '#6B93D6', radius: 9, orbitRadius: 170, speed: 0.01 },
      { name: 'Mars', color: '#C1440E', radius: 7, orbitRadius: 220, speed: 0.008 },
      { name: 'Jupiter', color: '#D8CA9D', radius: 20, orbitRadius: 300, speed: 0.002 },
      { name: 'Saturn', color: '#F4D47A', radius: 17, orbitRadius: 380, speed: 0.0009 },
      { name: 'Uranus', color: '#D1E7E7', radius: 12, orbitRadius: 450, speed: 0.0004 },
      { name: 'Neptune', color: '#5B5DDF', radius: 11, orbitRadius: 520, speed: 0.0001 },
    ];

    // Animation variables
    let time = 0;

    // Draw planet
    const drawPlanet = (planet, x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move canvas origin to center
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Draw orbits
      planets.forEach(planet => {
        if (planet.orbitRadius > 0) {
          ctx.beginPath();
          ctx.arc(0, 0, planet.orbitRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.stroke();
        }
      });

      // Draw planets
      planets.forEach(planet => {
        const x = Math.cos(time * planet.speed) * planet.orbitRadius;
        const y = Math.sin(time * planet.speed) * planet.orbitRadius;
        drawPlanet(planet, x, y);
      });

      ctx.restore();

      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', setCanvasSize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold mb-2">Solar System</h1>
        <p>An animated view of our cosmic neighborhood</p>
      </div>
    </div>
  );
};

export default SolarSystem;
