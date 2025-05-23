'use client'
import { useContext } from 'react';
import { DeveloperToolsContext } from '@/context/developer-tool-context';

export const useDeveloperTools = () => useContext(DeveloperToolsContext);
