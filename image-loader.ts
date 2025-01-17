import type { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // Convert to WebP and optimize
  return `https://res.cloudinary.com/airship19/image/upload/f_auto,c_limit,w_${width},q_${
    quality || 75
  }/airship19/${cleanSrc}`;
}
