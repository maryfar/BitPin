import { useEffect, useRef } from "react";

export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const startX = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX.current - endX;
      if (diff > 50) onSwipeLeft();  
      if (diff < -50) onSwipeRight(); 
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);
};
