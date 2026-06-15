const fs = require("fs");
const p = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend/package.json";
const pkg = JSON.parse(fs.readFileSync(p, "utf8"));
pkg.dependencies = {
  "@reown/appkit": "1.7.0",
  "@reown/appkit-adapter-wagmi": "1.7.0",
  "@tanstack/react-query": "^5.62.8",
  next: "^14.2.21",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  viem: "2.23.15",
  wagmi: "2.14.16",
};
pkg.overrides = {
  "@wagmi/connectors": "5.7.12",
  "@wagmi/core": "2.16.5",
};
fs.writeFileSync(p, JSON.stringify(pkg, null, 2), "utf8");