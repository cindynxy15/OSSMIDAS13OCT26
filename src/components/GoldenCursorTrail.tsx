import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  currentLife: number;
  color: string;
  shape: 'circle' | 'sparkle';
  rotation: number;
  vRot: number;
}

export const GoldenCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const goldColors = [
      '#FDE047', // Light gold
      '#FCD34D', // Soft gold
      '#F59E0B', // Amber gold
      '#FEF08A', // Champagne highlight
      '#D97706', // Rich deep gold
      '#FFFBEB', // Diamond sparkle
    ];

    const addParticle = (x: number, y: number, isBurst: boolean = false) => {
      const count = isBurst ? 8 : Math.random() < 0.6 ? 2 : 1;

      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length > 80) {
          particlesRef.current.shift(); // Limit max active particles for optimal 60fps
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 3 + 1.2 : Math.random() * 1.2 + 0.3;
        const size = isBurst ? Math.random() * 3.5 + 1.5 : Math.random() * 2.5 + 1.2;
        const maxLife = isBurst ? Math.random() * 28 + 22 : Math.random() * 22 + 16;
        const color = goldColors[Math.floor(Math.random() * goldColors.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isBurst ? 0.8 : 0.4), // upward golden shimmer drift
          size,
          alpha: 1,
          maxLife,
          currentLife: maxLife,
          color,
          shape: Math.random() < 0.35 ? 'sparkle' : 'circle',
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };

      if (lastPosRef.current) {
        const dx = currentPos.x - lastPosRef.current.x;
        const dy = currentPos.y - lastPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interpolate particles along fast movement paths to avoid gaps
        if (dist > 8) {
          const steps = Math.min(Math.floor(dist / 8), 4);
          for (let i = 1; i <= steps; i++) {
            const interpX = lastPosRef.current.x + (dx * i) / steps;
            const interpY = lastPosRef.current.y + (dy * i) / steps;
            addParticle(interpX, interpY, false);
          }
        } else {
          addParticle(currentPos.x, currentPos.y, false);
        }
      } else {
        addParticle(currentPos.x, currentPos.y, false);
      }

      lastPosRef.current = currentPos;
    };

    const handleMouseDown = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY, true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticle(touch.clientX, touch.clientY, false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticle(touch.clientX, touch.clientY, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.currentLife--;

        if (p.currentLife <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.rotation += p.vRot;

        const lifeRatio = p.currentLife / p.maxLife;
        p.alpha = lifeRatio;
        const currentSize = p.size * (0.4 + 0.6 * lifeRatio);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === 'sparkle') {
          // Four-pointed golden diamond star
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const r = currentSize * 1.5;
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();

          // Ambient soft glow
          ctx.shadowColor = '#F59E0B';
          ctx.shadowBlur = 6;
          ctx.fill();
        } else {
          // Circular golden fleck with soft halo
          ctx.beginPath();
          ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#FDE047';
          ctx.shadowBlur = 4;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
};
