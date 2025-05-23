'use client';
import { Stack } from '../contentstack-sdk';
import React, { createContext, useContext, useEffect, useState } from "react";

interface LivePreviewContextType {
  isInitialized: boolean;
  error: string | null;
  stack: typeof Stack | null;
}

export const LivePreviewContext = createContext<LivePreviewContextType>({
  isInitialized: false,
  error: null,
  stack: null
});

interface LivePreviewProviderProps {
  children: React.ReactNode;
  config?: {
    apiKey?: string;
    environment?: string;
    appHost?: string;
    livePreview?: string;
    [key: string]: any;
  };
}

const LivePreviewProvider = ({ children, config }: LivePreviewProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stack, setStack] = useState<typeof Stack | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isInitialized) return;

    const initialize = async () => {
      try {
        const ContentstackLivePreview = await import("@contentstack/live-preview-utils");
        await ContentstackLivePreview.default.init({
          // @ts-ignore
          stackSdk: Stack.config,
          enable: config?.livePreview === "true" || true,
          mode:"builder",
          debug: process.env.NODE_ENV === "development",
          ssr: true,
          stackDetails: {
            apiKey: config?.apiKey,
            environment: config?.environment,
          },
          clientUrlParams: {
            host: config?.appHost,
          },
        });
        setStack(Stack);
        setIsInitialized(true);
        console.log("✅ ContentStack Live Preview initialized successfully");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("❌ Failed to initialize ContentStack Live Preview:", errorMessage);
        setError(errorMessage);
      }
    };

    initialize();
  }, [config, isInitialized]);

  return (
    <LivePreviewContext.Provider value={{isInitialized, error, stack }}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: error ? 'red' : isInitialized ? 'green' : 'orange',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999,
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        >
          LivePreview: {error ? `Error: ${error.substring(0, 30)}...` : 
                       isInitialized ? 'Connected' : 'Connecting...'}
        </div>
      )}
    </LivePreviewContext.Provider>
  );
};

const useLivePreviewCtx = () => useContext(LivePreviewContext);

export { LivePreviewProvider, useLivePreviewCtx };