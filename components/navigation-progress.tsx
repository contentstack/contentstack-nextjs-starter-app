'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      trickleSpeed: 200,
      easing: 'ease',
      speed: 300
    });
    
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.remove(); 
    };
  }, [pathname, searchParams]);

  return null;
}