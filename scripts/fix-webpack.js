const fs = require("fs");
const path = require("path");
const p = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend/next.config.js";
fs.writeFileSync(p, `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "porto/internal": false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};
module.exports = nextConfig;
`, "utf8");