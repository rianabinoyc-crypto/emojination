import { useState, useRef, useCallback, useEffect } from 'react';

interface UseSwipeGestureOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  rotationFactor?: number;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 120,
  rotationFactor = 0.08
}: UseSwipeGestureOptions) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState<'left' | 'right' | null>(null);

  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (isExiting) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
    currentPos.current = { x: clientX, y: clientY };
  }, [isExiting]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || isExiting) return;
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    currentPos.current = { x: clientX, y: clientY };
    setOffset({ x: deltaX, y: deltaY });
  }, [isDragging, isExiting]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || isExiting) return;
    setIsDragging(false);

    const deltaX = offset.x;
    if (deltaX > threshold) {
      // Swiped Right (ACCEPT)
      setIsExiting('right');
      setOffset({ x: 600, y: offset.y });
      setTimeout(() => {
        onSwipeRight();
        setIsExiting(null);
        setOffset({ x: 0, y: 0 });
      }, 260);
    } else if (deltaX < -threshold) {
      // Swiped Left (REJECT)
      setIsExiting('left');
      setOffset({ x: -600, y: offset.y });
      setTimeout(() => {
        onSwipeLeft();
        setIsExiting(null);
        setOffset({ x: 0, y: 0 });
      }, 260);
    } else {
      // Return to center
      setOffset({ x: 0, y: 0 });
    }
  }, [isDragging, isExiting, offset, threshold, onSwipeRight, onSwipeLeft]);

  // Programmatic trigger (for buttons & keyboard)
  const triggerSwipe = useCallback((direction: 'left' | 'right') => {
    if (isExiting) return;
    setIsExiting(direction);
    setOffset({ x: direction === 'right' ? 600 : -600, y: 0 });
    setTimeout(() => {
      if (direction === 'right') {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
      setIsExiting(null);
      setOffset({ x: 0, y: 0 });
    }, 260);
  }, [isExiting, onSwipeRight, onSwipeLeft]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        triggerSwipe('left');
      } else if (e.key === 'ArrowRight') {
        triggerSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSwipe]);

  // Mouse event handlers
  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const rotation = offset.x * rotationFactor;
  const opacityRatio = Math.min(1, Math.abs(offset.x) / threshold);
  const swipeIntent: 'left' | 'right' | null = offset.x > 30 ? 'right' : offset.x < -30 ? 'left' : null;

  return {
    offset,
    rotation,
    isDragging,
    isExiting,
    swipeIntent,
    opacityRatio,
    triggerSwipe,
    dragProps: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: handleDragEnd,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  };
}
