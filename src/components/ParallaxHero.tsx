import React, { useEffect, useState } from 'react';

interface ParallaxHeroProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `translateY(${offsetY * speed}px)`,
        willChange: 'transform'
      }}
    >
      {children}
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl float-animation"
          style={{
            transform: `translate(${offsetY * 0.2}px, ${offsetY * 0.1}px)`
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          style={{
            transform: `translate(${-offsetY * 0.15}px, ${offsetY * 0.25}px)`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxHero;