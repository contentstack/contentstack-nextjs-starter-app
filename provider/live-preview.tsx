'use client';
import { Stack } from '../contentstack-sdk';
import React, { createContext, useContext, useEffect, useState } from "react";

// Define a more comprehensive context type for the Live Preview state
interface LivePreviewContextType {
  isInitialized: boolean;
  error: string | null;
  stack: typeof Stack | null; // Add the stack property to the context type
}

// Create a context with default values
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

/**
 * LivePreviewProvider component that handles Contentstack Live Preview initialization
 * and content refresh when entries change
 */
const LivePreviewProvider = ({ children, config }: LivePreviewProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stack, setStack] = useState<typeof Stack | null>(null);

  // Initialize Live Preview and set up entry change listener
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Prevent multiple initializations
    if (isInitialized) return;

    const initialize = async () => {
      try {
        console.log("Initializing ContentStack Live Preview");
        
        // Dynamically import the Live Preview utility
        const ContentstackLivePreview = await import("@contentstack/live-preview-utils");
        // const Stack = initializeContentStackSdk(config);
        // Initialize with configuration
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
        
        // Set up entry change listener
        // ContentstackLivePreview.default.onEntryChange(refresh);
        console.log("Stack after from LP",Stack);
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

    // Cleanup function
    return () => {
      // Cleanup could be implemented here if ContentstackLivePreview
      // provides a way to remove listeners
    };
  }, [config, isInitialized]);

  // Provide both timestamp and initialization status
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

// Custom hook to use the Live Preview context
const useLivePreviewCtx = () => useContext(LivePreviewContext);

export { LivePreviewProvider, useLivePreviewCtx };