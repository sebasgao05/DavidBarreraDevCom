import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 transition-all duration-300"
      style={{ 
        width: `${scrollProgress}%`,
        opacity: scrollProgress > 0 ? 1 : 0
      }}
      role="progressbar"
      aria-label="Progreso de lectura de la página"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgress;