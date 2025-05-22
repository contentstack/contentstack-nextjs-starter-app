import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Not Found - Contentstack-Nextjs-Starter-App',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  );
}