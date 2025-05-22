import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppLayout from './app-layout';
import { LivePreviewProvider } from '@/provider/live-preview';
import { headers } from 'next/headers';

import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/third-party.css';
import '../styles/style.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// Get environment variables for client components
const runtimeConfig = {
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_API_KEY,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || process.env.CONTENTSTACK_ENVIRONMENT,
  appHost: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST || process.env.CONTENTSTACK_APP_HOST,
  livePreview: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW || process.env.CONTENTSTACK_LIVE_PREVIEW,
};

export const metadata: Metadata = {
  title: 'Contentstack-Nextjs-Starter-App',
  description: 'A starter app for Contentstack and Nextjs',
  applicationName: 'Contentstack-Nextjs-Starter-App'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if Live Preview is enabled for this request
  const headersList = headers();
  const hasLivePreview = (await headersList).get('x-contentstack-live-preview') === 'true';

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" 
          integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
          crossOrigin="anonymous" 
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body>
        <LivePreviewProvider config={runtimeConfig}>
          <AppLayout hasLivePreview={hasLivePreview}>
            {children}
          </AppLayout>
        </LivePreviewProvider>
      </body>
    </html>
  );
}