const withPWA = require("next-pwa");

const config = {
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
  },
};
module.exports = process.env.NODE_ENV === "development" ? config : withPWA(config);
