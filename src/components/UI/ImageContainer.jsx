import Image from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react';
import { isImageLoaded } from '../utils';

const ImageContainer = forwardRef(function ImageContainer(
  { className = '', src, alt, ...props },
  ref
) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await isImageLoaded(src);
        setImageLoading(false);
      } catch {}
    })();
  });

  return !imageLoading ? (
    <Image src={src} className={className} alt={alt} {...props} ref={ref} />
  ) : (
    <div className="w-full h-full bg-gray-200 animate-pulse" />
  );
});

export default ImageContainer;
