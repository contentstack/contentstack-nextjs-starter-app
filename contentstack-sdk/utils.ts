
import { Config, Region, Stack } from 'contentstack';
import {runtimeConfig} from './config';
// set region
const setRegion = (): Region => {
  let region = 'US' as keyof typeof Region;
  if (!!runtimeConfig.region && runtimeConfig.region !== 'us') {
    region = runtimeConfig.region.toLocaleUpperCase().replace(
      '-',
      '_'
    ) as keyof typeof Region;
  }
  return Region[region];
};

// contentstack sdk initialization
export const initializeContentStackSdk = (config:any): Stack => {
  const stackConfig: Config = {
    api_key: config.apiKey as string,
    delivery_token: config.deliveryToken as string,
    environment: config.environment as string,
    region: setRegion(),
    branch: config.branch || 'main',
  };

  stackConfig.live_preview = {
    preview_token: config.previewToken as string,
    enable: config.livePreview === 'true',
    host: config.previewHost as string,
  };
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace('api', 'cdn');
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === 'US') {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url = ''): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
