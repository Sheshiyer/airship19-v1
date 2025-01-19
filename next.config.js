/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
    };
    return config;
  },
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during build
  },
};

module.exports = nextConfig;
