import { Config, Region, LivePreview, Stack } from "contentstack";

/** All Contentstack config uses NEXT_PUBLIC_* (see .env.local.sample and next.config.js). */
const apiKey = () => process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const deliveryToken = () => process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const environment = () => process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
const branch = () => process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH;
const regionEnv = () => process.env.NEXT_PUBLIC_CONTENTSTACK_REGION;
const previewToken = () => process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN;
const previewHost = () => process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST;
const appHost = () => process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST;
const livePreviewFlag = () => process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW;

const livePreviewEnabled = () => livePreviewFlag() === "true";

// basic env validation
export const isBasicConfigValid = () => {
  return !!(apiKey() && deliveryToken() && environment());
};

// Live preview config validation
export const isLpConfigValid = () => {
  return (
    livePreviewEnabled() &&
    !!previewToken() &&
    !!previewHost() &&
    !!appHost()
  );
};

// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  const r = regionEnv();
  if (!!r && r.toLowerCase() !== "us") {
    region = r.toUpperCase().replace(/-/g, "_") as keyof typeof Region;
  }
  return Region[region];
};

// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error(
      "Live preview is enabled but required variables are missing. Set NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN, PREVIEW_HOST, and APP_HOST in .env."
    );
  return {
    preview_token: previewToken() as string,
    enable: true,
    host: previewHost() as string,
  } as LivePreview;
};

// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error(
      "Set NEXT_PUBLIC_CONTENTSTACK_API_KEY, DELIVERY_TOKEN, and ENVIRONMENT in .env"
    );
  const stackConfig: Config = {
    api_key: apiKey() as string,
    delivery_token: deliveryToken() as string,
    environment: environment() as string,
    region: setRegion(),
    branch: (branch() as string) || "main"
  };
  if (livePreviewEnabled()) {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};

// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace("api", "cdn");
};

// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};

// prod url validation for custom host
export const isValidCustomHostUrl = (url = ""): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
