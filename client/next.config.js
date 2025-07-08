/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // ✅ (Optional) Enable SWC minification for smaller JS bundles
  swcMinify: true,
};

module.exports = nextConfig
