/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['images.contentstack.io'],
    formats: ['image/avif', 'image/webp'],
  }
};

module.exports = process.env.NODE_ENV === "development" 
  ? nextConfig 
  : withPWA(nextConfig);
