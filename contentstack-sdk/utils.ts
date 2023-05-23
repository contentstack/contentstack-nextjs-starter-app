import { Region } from "contentstack";
export const customHostUrl = (baseUrl: string):string => {
  return baseUrl.replace("api", "cdn");
};

export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};

export const isValidCustomHostUrl = (url: string): boolean => {
  return url? !generateUrlBasedOnRegion().includes(url):false;
};
