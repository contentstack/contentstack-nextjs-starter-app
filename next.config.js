const path = require("path");
const { loadEnvConfig } = require("@next/env");

// Load .env / .env.local before reading process.env (so `env` below is populated).
const projectDir = path.resolve(__dirname);
loadEnvConfig(projectDir, process.env.NODE_ENV !== "production");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

/** Contentstack: use NEXT_PUBLIC_* only in .env so values are available server + client. */
const config = {
  logging: {
    incomingRequests: false,
    browserToTerminal: false,
  },
  env: {
    NEXT_PUBLIC_CONTENTSTACK_API_KEY:
      process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
    NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT:
      process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    NEXT_PUBLIC_CONTENTSTACK_BRANCH:
      process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
    NEXT_PUBLIC_CONTENTSTACK_REGION:
      process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "us",
    NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST:
      process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST ||
      "rest-preview.contentstack.com",
    NEXT_PUBLIC_CONTENTSTACK_API_HOST:
      process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST || "api.contentstack.io",
    NEXT_PUBLIC_CONTENTSTACK_APP_HOST:
      process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST || "app.contentstack.com",
    NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW:
      process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW || "true",
    NEXT_PUBLIC_CONTENTSTACK_LIVE_EDIT_TAGS:
      process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_EDIT_TAGS || "false",
  },
  experimental: { largePageDataBytes: 128 * 100000 },
};
module.exports =
  process.env.NODE_ENV === "development" ? config : withPWA(config);
