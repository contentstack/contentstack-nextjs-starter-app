'use client'
import { FooterProps, HeaderProps, PageProps } from '@/typescript/layout';
import { BlogPosts } from '@/typescript/pages';
import { createContext } from 'react';

export type DeveloperToolsState = {
  header?: HeaderProps;
  footer?: FooterProps;
  page?: PageProps;
  blogPost?: BlogPosts;
  blogList?: BlogPosts[];
  [key: string]: any;
};

type DeveloperTools = {
  state: DeveloperToolsState;
  setState: (
    updater: DeveloperToolsState | ((prevState: DeveloperToolsState) => DeveloperToolsState)
  ) => void;
}

export const DeveloperToolsContext = createContext<DeveloperTools>({
  state: {},
  setState: () => {},
});
