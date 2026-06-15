const fs = require("fs");
const p = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend/src/i18n/context.tsx";
let c = fs.readFileSync(p, "utf8");
c = c.replace(
  "  t: typeof strings.en;",
  "  t: (typeof strings)[Locale];"
);
fs.writeFileSync(p, c, "utf8");