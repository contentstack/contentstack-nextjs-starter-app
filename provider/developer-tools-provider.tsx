'use client'
import { ReactNode, useState } from 'react';
import { DeveloperToolsContext, DeveloperToolsState } from '@/context/developer-tool-context';

export const DeveloperToolsProvider = ({ children }: { children: ReactNode }) => {

  const [state, setState] = useState<DeveloperToolsState>({});
  return (
    <DeveloperToolsContext.Provider value={{ state, setState }}>
      {children}
    </DeveloperToolsContext.Provider>
  );
}