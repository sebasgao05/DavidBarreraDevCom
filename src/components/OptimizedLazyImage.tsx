import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface OptimizedLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  srcSet?: string;
}

const OptimizedLazyImage: React.FC<OptimizedLazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  placeholder,
  blurDataURL,
  priority = false,
  onLoad,
  onError,
  sizes,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const generateSrcSet = useCallback((baseSrc: string) => {
    if (srcSet) return srcSet;
    
    const extension = baseSrc.split('.').pop();
    if (!extension) return '';
    
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return [
      `${baseName}-320.webp 320w`,
      `${baseName}-640.webp 640w`,
      `${baseName}-1024.webp 1024w`,
      `${baseName}-1920.webp 1920w`
    ].join(', ');
  }, [srcSet]);

  const createBlurPlaceholder = useCallback(() => {
    if (blurDataURL) return blurDataURL;
    
    const id = Math.random().toString(36).substr(2, 9);
    const svg = `
      <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad-${id})" />
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [blurDataURL]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(placeholder || blurDataURL) ? (
              <img
                src={createBlurPlaceholder()}
                alt=""
                className="w-full h-full object-cover filter blur-sm scale-110"
                aria-hidden="true"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Error al cargar imagen</p>
          </div>
        </div>
      )}

      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedLazyImage;

export const useImagePreloader = () => {
  const preloadedImages = useRef(new Set<string>());

  const preloadImage = useCallback((src: string): Promise<void> => {
    if (preloadedImages.current.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        preloadedImages.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback((sources: string[]): Promise<void[]> => {
    return Promise.all(sources.map(preloadImage));
  }, [preloadImage]);

  return { preloadImage, preloadImages };
};

export const CriticalImage: React.FC<OptimizedLazyImageProps> = (props) => {
  return <OptimizedLazyImage {...props} priority={true} />;
};