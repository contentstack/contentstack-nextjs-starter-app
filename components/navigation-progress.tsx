'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress options
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      trickleSpeed: 200,
      easing: 'ease',
      speed: 300
    });
    
    // Start progress bar immediately
    NProgress.start();

    // Complete the progress bar with a slight delay for better UX
    const timer = setTimeout(() => {
      NProgress.done(true); // Force complete to avoid hanging progress bars
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.remove(); // Clean up on unmount
    };
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything visible
}