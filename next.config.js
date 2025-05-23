const { env } = require('process');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    appHost: process.env.CONTENTSTACK_APP_HOST,
    apiHost: process.env.CONTENTSTACK_API_HOST,
    previewHost: process.env.CONTENTSTACK_PREVIEW_HOST,
    region: process.env.CONTENTSTACK_REGION,
    livePreview: process.env.CONTENTSTACK_LIVE_PREVIEW,
    branch: process.env.CONTENTSTACK_BRANCH,
    previewToken: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    liveEdit: process.env.CONTENTSTACK_LIVE_EDIT_TAGS,
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
