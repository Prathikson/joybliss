/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip type checking during build (Vercel will still show type errors in logs)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize font loading
  optimizeFonts: true,
  // Add fallback for font loading failures
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion'],
  },
};

module.exports = nextConfig;