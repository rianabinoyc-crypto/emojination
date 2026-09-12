import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  opacity: number;
}

const PARTICLES = ['✨', '✦', '💫', '·', '✧'];
const MAX_PARTICLES = 12;

interface CursorTrailProps {
  containerRef: React.RefObject<HTMLElement>;
  enabled: boolean;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ containerRef, enabled }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const particleIdRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle spawn rate to 45ms to avoid overload
      if (now - lastSpawnRef.current < 45) return;
      lastSpawnRef.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only spawn if inside hero bounds
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const newParticle: Particle = {
        id: ++particleIdRef.current,
        x: x + (Math.random() * 16 - 8),
        y: y + (Math.random() * 16 - 8),
        char: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
        size: Math.random() * 6 + 10,
        opacity: 0.85,
      };

      setParticles(prev => {
        const next = [...prev, newParticle];
        return next.length > MAX_PARTICLES ? next.slice(next.length - MAX_PARTICLES) : next;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Decay interval for existing particles
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            y: p.y - 1.2,
            opacity: p.opacity - 0.08,
          }))
          .filter(p => p.opacity > 0.1)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [containerRef, enabled]);

  if (!enabled || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-pink-300 font-bold pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            textShadow: '0 0 8px rgba(244, 114, 182, 0.7)',
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
