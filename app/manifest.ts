import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Contentstack-Nextjs-Starter-App',
    short_name: 'Starter-App',
    description: 'Starter app for nextjs and contentstack integration',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#715cdd',
    icons: [
      {
        src: '/icon/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
  };
}