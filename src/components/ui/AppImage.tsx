import React, { useState, useCallback, useMemo, memo } from 'react';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  onClick,
  fallbackSrc = '/assets/images/no_image.png',
  loading = 'lazy',
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  }, [hasError, imageSrc, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const imageClassName = useMemo(() => {
    const classes = [className];
    if (isLoading) classes.push('bg-gray-200');
    if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
    return classes.filter(Boolean).join(' ');
  }, [className, isLoading, onClick]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={imageClassName}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
    />
  );
});

AppImage.displayName = 'AppImage';

export default AppImage;
