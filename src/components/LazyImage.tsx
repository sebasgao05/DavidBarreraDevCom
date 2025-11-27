import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  responsive?: boolean;
  sizes?: string;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  responsive = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP version of the image
  const getWebPSrc = (originalSrc: string): string => {
    if (originalSrc.includes('ui-avatars.com') || originalSrc.includes('via.placeholder.com')) {
      return originalSrc;
    }
    
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    if (extension && ['jpg', 'jpeg', 'png'].includes(extension)) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  // Generate responsive image sources (simplified)
  const generateSources = (originalSrc: string) => {
    const webpSrc = getWebPSrc(originalSrc);
    return {
      webpSrc,
      fallbackSrc: originalSrc
    };
  };

  // Check if browser supports WebP
  const supportsWebP = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const webpSupported = await supportsWebP();
        const targetSrc = webpSupported ? getWebPSrc(src) : src;
        
        // Test if WebP version exists
        if (webpSupported && targetSrc !== src) {
          const testImg = new Image();
          testImg.onload = () => setImageSrc(targetSrc);
          testImg.onerror = () => setImageSrc(src);
          testImg.src = targetSrc;
        } else {
          setImageSrc(src);
        }
      } catch {
        setImageSrc(src);
      }
    };

    loadImage();
  }, [src]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  if (!imageSrc) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  const actualLoading = priority ? 'eager' : loading;
  const sources = generateSources(imageSrc);

  // Use picture element for WebP optimization when responsive is enabled
  if (responsive && sources.webpSrc !== sources.fallbackSrc) {
    return (
      <picture>
        <source srcSet={sources.webpSrc} type="image/webp" />
        <img
          ref={imgRef}
          src={sources.fallbackSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          width={width}
          height={height}
          loading={actualLoading}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    );
  }

  // Simple img element
  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      width={width}
      height={height}
      loading={actualLoading}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default LazyImage;

// Utility component for critical images (hero, above fold)
export const CriticalImage: React.FC<Omit<LazyImageProps, 'loading' | 'priority'>> = (props) => (
  <LazyImage {...props} loading="eager" priority={true} />
);

// Utility component for decorative images
export const DecorativeImage: React.FC<LazyImageProps & { decorative?: boolean }> = ({ 
  decorative = false, 
  alt, 
  ...props 
}) => (
  <LazyImage {...props} alt={decorative ? '' : alt} />  
);