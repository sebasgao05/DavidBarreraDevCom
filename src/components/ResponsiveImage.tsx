import React, { useState, useRef, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  aspectRatio = 'auto',
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive image sources
  const generateResponsiveSources = (originalSrc: string) => {
    // Skip external URLs (like Credly)
    if (originalSrc.startsWith('http') && !originalSrc.includes('david-barrera.com')) {
      return {
        webpSrcSet: '',
        fallbackSrcSet: originalSrc,
        webpSrc: originalSrc,
        fallbackSrc: originalSrc
      };
    }

    const basePath = originalSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    
    // Generate WebP sources with different sizes
    const webpSizes = [320, 640, 768, 1024, 1280];
    const webpSrcSet = webpSizes
      .map(size => `${basePath}-${size}.webp ${size}w`)
      .join(', ');
    
    // Fallback sources
    const fallbackSrcSet = webpSizes
      .map(size => `${basePath}-${size}.${extension} ${size}w`)
      .join(', ');

    return {
      webpSrcSet,
      fallbackSrcSet,
      webpSrc: `${basePath}.webp`,
      fallbackSrc: originalSrc
    };
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  const actualLoading = priority ? 'eager' : loading;
  const sources = generateResponsiveSources(src);
  
  // Aspect ratio classes
  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  }[aspectRatio];

  // Loading skeleton
  if (!imageLoaded && !imageError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${aspectRatioClass} ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (imageError) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${aspectRatioClass} ${className}`}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  // For external images (like Credly), use simple img tag
  if (src.startsWith('http') && !src.includes('david-barrera.com')) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${aspectRatioClass} ${className}`}
        width={width}
        height={height}
        loading={actualLoading}
        onLoad={handleLoad}
        onError={handleError}
        {...(priority && { fetchPriority: 'high' as any })}
      />
    );
  }

  // Use picture element for responsive WebP images
  return (
    <picture className={aspectRatioClass}>
      {sources.webpSrcSet && (
        <source 
          srcSet={sources.webpSrcSet} 
          sizes={sizes}
          type="image/webp" 
        />
      )}
      {sources.fallbackSrcSet && (
        <source 
          srcSet={sources.fallbackSrcSet} 
          sizes={sizes}
        />
      )}
      <img
        ref={imgRef}
        src={sources.fallbackSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } w-full h-full object-cover ${className}`}
        width={width}
        height={height}
        loading={actualLoading}
        onLoad={handleLoad}
        onError={handleError}
        {...(priority && { fetchPriority: 'high' as any })}
      />
    </picture>
  );
};

export default ResponsiveImage;

// Utility components
export const CriticalResponsiveImage: React.FC<Omit<ResponsiveImageProps, 'loading' | 'priority'>> = (props) => (
  <ResponsiveImage {...props} loading="eager" priority={true} />
);

export const LazyResponsiveImage: React.FC<ResponsiveImageProps> = (props) => (
  <ResponsiveImage {...props} loading="lazy" priority={false} />
);