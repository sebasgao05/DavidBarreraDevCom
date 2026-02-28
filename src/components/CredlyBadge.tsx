import React, { useState, useEffect } from 'react';

interface CredlyBadgeProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}

const CredlyBadge: React.FC<CredlyBadgeProps> = ({
  src,
  alt,
  className = '',
  size = 64
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    // Optimizar URL de Credly para el tamaño específico
    const optimizeCredlyUrl = (url: string, targetSize: number) => {
      // Si ya tiene un tamaño específico, reemplazarlo
      if (url.includes('/size/')) {
        return url.replace(/\/size\/\d+x\d+\//g, `/size/${targetSize}x${targetSize}/`);
      }
      
      // Si no tiene tamaño, agregarlo
      const baseUrl = url.replace('images.credly.com/', `images.credly.com/size/${targetSize}x${targetSize}/`);
      return baseUrl;
    };

    setOptimizedSrc(optimizeCredlyUrl(src, size));
  }, [src, size]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
    // Fallback a la URL original si la optimizada falla
    if (optimizedSrc !== src) {
      setOptimizedSrc(src);
      setImageError(false);
    }
  };

  // Loading skeleton
  if (!imageLoaded && !imageError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (imageError) {
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-gray-400 text-xs text-center p-2">Badge unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      width={size}
      height={size}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      // Preconnect hint ya está en el HTML
    />
  );
};

export default CredlyBadge;