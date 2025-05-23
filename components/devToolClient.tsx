'use client';
import { useDeveloperTools } from '@/hooks/useDevTools';
import { useEffect } from 'react';

export const DevToolsClient = ({ page, requiredField, children }: { page: any, requiredField?: string[], children: React.ReactNode }) => {
  const { setState } = useDeveloperTools();
  
  useEffect(() => {
    setState((prev)=>{
      const JSON_DATA = {...prev, ...page};
      Object.keys(JSON_DATA).forEach((key) => {
        if (key !== 'header' && key !== 'footer' && !requiredField?.includes(key)) {  
          delete JSON_DATA[key];
        }
      })
     return {...JSON_DATA}
    });

  }, [page])
  return (
    <>
      {children}
    </>
  );

}