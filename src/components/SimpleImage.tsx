import React, { useState } from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', src);
    if (onError) {
      onError(e);
    }
  };

  return (
    <>
      {!imageLoaded && (
        <div 
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={imageLoaded ? {} : { position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
};

export default SimpleImage;