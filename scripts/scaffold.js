const fs = require("fs");
const path = require("path");

const root = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend";

function w(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

w(
  "package.json",
  JSON.stringify(
    {
      name: "cs-dapp-frontend",
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        "@reown/appkit": "^1.6.8",
        "@reown/appkit-adapter-wagmi": "^1.6.8",
        "@tanstack/react-query": "^5.62.8",
        next: "^14.2.21",
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        viem: "^2.21.54",
        wagmi: "^2.14.6",
      },
      devDependencies: {
        "@types/node": "^22.10.2",
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        autoprefixer: "^10.4.20",
        postcss: "^8.4.49",
        tailwindcss: "^3.4.16",
        typescript: "^5.7.2",
      },
    },
    null,
    2
  )
);

w("next.config.js", '/** @type {import("next").NextConfig} */\nmodule.exports = { reactStrictMode: true };\n');

w(
  "tsconfig.json",
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    },
    null,
    2
  )
);

w("postcss.config.js", "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };\n");

w(
  "tailwind.config.ts",
  `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a1628",
        gold: "#c9a227",
        accent: "#1e3a5f",
      },
    },
  },
  plugins: [],
};

export default config;
`
);

w(
  "next-env.d.ts",
  '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n'
);

w(
  ".env.example",
  `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_DAPP_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_USDT_ADDRESS=0x55d398326f99059fF775485246999027B3197955
`
);

w(
  "src/lib/config.ts",
  `export const BSC_CHAIN_ID = 56;

export const config = {
  dappAddress: (process.env.NEXT_PUBLIC_DAPP_ADDRESS || "0x0000000000000000000000000000000000000000") as \`0x\${string}\`,
  tokenAddress: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000") as \`0x\${string}\`,
  usdtAddress: (process.env.NEXT_PUBLIC_USDT_ADDRESS || "0x55d398326f99059fF775485246999027B3197955") as \`0x\${string}\`,
  wcProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id",
  minPrivateSale: 100n * 10n ** 18n,
  maxPrivateSale: 5000n * 10n ** 18n,
  maxCumulative: 5000n * 10n ** 18n,
};
`
);

w(
  "src/lib/abis.ts",
  `export const erc20Abi = [
  { type: "function", name: "approve", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ type: "bool" }], stateMutability: "nonpayable" },
  { type: "function", name: "allowance", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "decimals", inputs: [], outputs: [{ type: "uint8" }], stateMutability: "view" },
] as const;

export const dappAbi = [
  { type: "function", name: "privateSale", inputs: [{ name: "usdtAmount", type: "uint256" }, { name: "inviterInput", type: "address" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "totalPrivateSaleUsdt", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "privateSaleTotal", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getEffectiveVipLevel", inputs: [{ name: "user", type: "address" }], outputs: [{ type: "uint8" }], stateMutability: "view" },
  { type: "function", name: "teamPerformance", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "godAddress", inputs: [], outputs: [{ type: "address" }], stateMutability: "view" },
] as const;
`
);

w(
  "src/lib/i18n.tsx",
  `"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Lang = "en" | "zh";

const dict = {
  en: {
    brand: "ChainScale Protocol",
    tagline: "Institutional-grade token infrastructure on BSC",
    privateSale: "Private Sale",
    amount: "USDT Amount",
    inviter: "Inviter Address (optional)",
    approve: "Approve USDT",
    participate: "Participate",
    totalRaised: "Total Private Sale",
    myContribution: "My Contribution",
    vipLevel: "VIP Level",
    performance: "Team Performance (5 gen)",
    connect: "Connect Wallet",
    wrongNetwork: "Please switch to BSC Mainnet",
    heroTitle: "Next-generation digital asset protocol",
    heroDesc: "Secure private sale, referral rewards, and automated on-chain dividends.",
    minMax: "100 - 5,000 USDT per transaction, 5,000 USDT cumulative cap",
    vip0: "Normal User",
  },
  zh: {
    brand: "ChainScale 协议",
    tagline: "BSC 上的机构级代币基础设施",
    privateSale: "私募",
    amount: "USDT 数量",
    inviter: "邀请人地址（选填）",
    approve: "授权 USDT",
    participate: "参与私募",
    totalRaised: "项目私募总值",
    myContribution: "我已私募",
    vipLevel: "VIP 等级",
    performance: "推广业绩（5代）",
    connect: "连接钱包",
    wrongNetwork: "请切换到 BSC 主网",
    heroTitle: "新一代数字资产协议",
    heroDesc: "安全私募、推荐奖励与自动化链上分红。",
    minMax: "单次 100-5000 USDT，累计上限 5000 USDT",
    vip0: "普通用户",
  },
} as const;

type Dict = typeof dict.en;

const I18nContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void } | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("Missing I18nProvider");
  return ctx;
}

export function vipLabel(level: number, t: Dict) {
  if (level === 0) return t.vip0;
  return \`VIP\${level}\`;
}
`
);

w(
  "src/lib/wagmi.ts",
  `import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bsc } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "wagmi";
import { config as appConfig } from "./config";

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId: appConfig.wcProjectId,
  networks: [bsc],
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
`
);

w(
  "src/app/globals.css",
  `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  @apply bg-navy text-white antialiased;
}

.glass {
  @apply bg-white/5 backdrop-blur-md border border-white/10;
}
`
);

w(
  "src/components/Providers.tsx",
  `"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { bsc } from "@reown/appkit/networks";
import { WagmiProvider } from "wagmi";
import { ReactNode, useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import { wagmiAdapter } from "@/lib/wagmi";
import { config } from "@/lib/config";

if (typeof window !== "undefined") {
  createAppKit({
  adapters: [wagmiAdapter],
  projectId: config.wcProjectId,
  networks: [bsc],
  defaultNetwork: bsc,
  metadata: {
    name: "ChainScale Protocol",
    description: "BSC Token Private Sale DApp",
    url: "https://chainscale.example",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  features: { analytics: false },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>{children}</I18nProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
`
);

w(
  "src/components/Header.tsx",
  `"use client";

import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xl font-semibold tracking-wide text-gold">{t.brand}</p>
          <p className="text-xs text-white/60">{t.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-white/20 px-3 py-1 text-sm hover:border-gold hover:text-gold"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <w3m-button />
        </div>
      </div>
    </header>
  );
}
`

// Fix appkit-button - need to use proper component from reown

console.log("Frontend scaffold part 1 done");
