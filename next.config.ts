import type { NextConfig } from 'next';
import type { ImageLoaderProps } from 'next/image';
import type { Configuration as WebpackConfig } from 'webpack';

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  // Use Cloudinary or similar service for image optimization
  return `https://res.cloudinary.com/airship19/image/upload/f_auto,q_${
    quality || 75
  },w_${width}/${src}`;
};

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers: async () => [
    {
      source: "/perspectives/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:path*{.jpg,.jpeg,.png,.webp,.svg}",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  webpack: (config: WebpackConfig) => {
    config.module?.rules?.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
      type: "asset",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
