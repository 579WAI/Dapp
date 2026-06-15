const fs = require("fs");
const path = require("path");
const root = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend";
const created = [];

function w(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  created.push(rel);
}

w("package.json", JSON.stringify({
  name: "cs-dapp-frontend",
  version: "1.0.0",
  private: true,
  scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
  dependencies: {
    "@reown/appkit": "^1.6.8",
    "@reown/appkit-adapter-wagmi": "^1.6.8",
    "@tanstack/react-query": "^5.62.8",
    next: "^14.2.21",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    viem: "^2.21.54",
    wagmi: "^2.14.6"
  },
  devDependencies: {
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    autoprefixer: "^10.4.20",
    postcss: "^8.4.49",
    tailwindcss: "^3.4.16",
    typescript: "^5.7.2"
  }
}, null, 2));

w("next.config.js", "/** @type {import('next').NextConfig} */\nmodule.exports = { reactStrictMode: true };\n");

w("tsconfig.json", JSON.stringify({
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
    paths: { "@/*": ["./src/*"] }
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  exclude: ["node_modules"]
}, null, 2));

w("tailwind.config.ts", `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0a1628", light: "#0f2137", card: "#122a45" },
        gold: { DEFAULT: "#c9a227", dim: "#a8861f", glow: "#e8c547" },
      },
      boxShadow: { gold: "0 0 24px rgba(201, 162, 39, 0.25)" },
    },
  },
  plugins: [],
};
export default config;
`);

w("postcss.config.js", "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };\n");
w(".env.example", "# WalletConnect / Reown Cloud project id\nNEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=\n\n# Deployed contract addresses on BSC mainnet\nNEXT_PUBLIC_DAPP_ADDRESS=\nNEXT_PUBLIC_TOKEN_ADDRESS=\nNEXT_PUBLIC_USDT_ADDRESS=\n");
w(".gitignore", "node_modules\n.next\nout\n.env\n.env.local\n*.log\n");
w("next-env.d.ts", "/// <reference types=\"next\" />\n/// <reference types=\"next/image-types/global\" />\n");

w("src/types/web-components.d.ts", `import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "w3m-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "appkit-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
`);

w("src/lib/abis.ts", `export const erc20Abi = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

export const dappAbi = [
  {
    type: "function",
    name: "contribute",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "inviter", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "totalPrivateSale",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userContribution",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "vipLevel",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "teamPerformance",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
`);

w("src/lib/env.ts", `export const env = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  dappAddress: (process.env.NEXT_PUBLIC_DAPP_ADDRESS ?? "") as \`0x\${string}\`,
  tokenAddress: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS ?? "") as \`0x\${string}\`,
  usdtAddress: (process.env.NEXT_PUBLIC_USDT_ADDRESS ?? "") as \`0x\${string}\`,
};

export function hasContractConfig(): boolean {
  return Boolean(env.dappAddress && env.usdtAddress);
}
`);

w("src/lib/chains.ts", `import { bsc } from "viem/chains";

export const SUPPORTED_CHAIN = bsc;
export const SUPPORTED_CHAIN_ID = bsc.id;
`);

w("src/i18n/strings.ts", `export type Locale = "en" | "zh";

export const strings = {
  en: {
    brand: "Capital Syndicate",
    tagline: "Institutional-grade private sale on BSC",
    nav: { home: "Home", sale: "Private Sale" },
    hero: {
      title: "Exclusive BSC Private Sale",
      subtitle: "Secure USDT contribution with transparent on-chain stats and VIP rewards.",
      cta: "Join Private Sale",
    },
    stats: {
      title: "Live Statistics",
      totalSale: "Total Private Sale",
      myContribution: "My Contribution",
      vipLevel: "VIP Level",
      teamPerformance: "Team Performance",
      connectHint: "Connect wallet to view personal stats",
    },
    sale: {
      title: "Private Sale",
      amount: "Amount (USDT)",
      amountHint: "Min 100 — Max 5,000 USDT",
      inviter: "Inviter address (optional)",
      approve: "Approve USDT",
      contribute: "Contribute",
      approving: "Approving…",
      contributing: "Submitting…",
      successApprove: "USDT approved",
      successContribute: "Contribution submitted",
      invalidAmount: "Enter an amount between 100 and 5000 USDT",
      invalidInviter: "Invalid inviter address",
      configMissing: "Contract addresses not configured. Set env variables.",
    },
    network: {
      title: "Wrong Network",
      body: "Please switch to BNB Smart Chain (BSC) mainnet to continue.",
      switch: "Switch to BSC",
      switching: "Switching…",
    },
    lang: { en: "EN", zh: "中文" },
  },
  zh: {
    brand: "资本联盟",
    tagline: "BSC 机构级私募",
    nav: { home: "首页", sale: "私募" },
    hero: {
      title: "BSC 专属私募",
      subtitle: "USDT 安全参与，链上统计透明，VIP 奖励。",
      cta: "参与私募",
    },
    stats: {
      title: "实时数据",
      totalSale: "私募总额",
      myContribution: "我的贡献",
      vipLevel: "VIP 等级",
      teamPerformance: "团队业绩",
      connectHint: "连接钱包查看个人数据",
    },
    sale: {
      title: "私募认购",
      amount: "金额 (USDT)",
      amountHint: "最低 100 — 最高 5,000 USDT",
      inviter: "邀请人地址（可选）",
      approve: "授权 USDT",
      contribute: "认购",
      approving: "授权中…",
      contributing: "提交中…",
      successApprove: "USDT 已授权",
      successContribute: "认购已提交",
      invalidAmount: "请输入 100 至 5000 USDT",
      invalidInviter: "邀请人地址无效",
      configMissing: "合约地址未配置，请设置环境变量。",
    },
    network: {
      title: "网络错误",
      body: "请切换到 BNB 智能链 (BSC) 主网。",
      switch: "切换到 BSC",
      switching: "切换中…",
    },
    lang: { en: "EN", zh: "中文" },
  },
} as const;

export type StringKey = keyof typeof strings.en;
`);

w("src/i18n/context.tsx", `'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Locale, strings } from "./strings";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof strings.en;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", l);
    }
  }, []);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "zh") setLocaleState(saved);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: strings[locale] }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
`);

w("src/lib/wagmi.ts", `import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "@wagmi/core";
import { SUPPORTED_CHAIN } from "./chains";
import { env } from "./env";

export const projectId = env.projectId || "00000000000000000000000000000000";

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks: [SUPPORTED_CHAIN],
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
`);

w("src/components/Providers.tsx", `'use client';

import { wagmiAdapter, projectId } from "@/lib/wagmi";
import { SUPPORTED_CHAIN } from "@/lib/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import React, { useState } from "react";
import { I18nProvider } from "@/i18n/context";

let appKitReady = false;

function ensureAppKit() {
  if (typeof window === "undefined" || appKitReady) return;
  appKitReady = true;
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [SUPPORTED_CHAIN],
    projectId,
    metadata: {
      name: "Capital Syndicate DApp",
      description: "BSC private sale",
      url: typeof window !== "undefined" ? window.location.origin : "https://localhost",
      icons: ["https://avatars.githubusercontent.com/u/37784829"],
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#c9a227",
      "--w3m-color-mix": "#0a1628",
      "--w3m-color-mix-strength": 40,
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  ensureAppKit();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>{children}</I18nProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
`);

w("src/components/Header.tsx", `'use client';

import { useI18n } from "@/i18n/context";

export function Header() {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <p className="font-display text-lg tracking-wide text-gold">{t.brand}</p>
          <p className="text-xs text-white/50">{t.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-gold/30 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={\`rounded-full px-2.5 py-1 \${locale === "en" ? "bg-gold text-navy" : "text-white/70"}\`}
            >
              {t.lang.en}
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={\`rounded-full px-2.5 py-1 \${locale === "zh" ? "bg-gold text-navy" : "text-white/70"}\`}
            >
              {t.lang.zh}
            </button>
          </div>
          <w3m-button />
        </div>
      </div>
    </header>
  );
}
`);

w("src/components/NetworkGuard.tsx", `'use client';

import { useI18n } from "@/i18n/context";
import { SUPPORTED_CHAIN_ID } from "@/lib/chains";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

export function NetworkGuard() {
  const { t } = useI18n();
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected || chainId === SUPPORTED_CHAIN_ID) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4">
      <div className="max-w-md rounded-2xl border border-gold/30 bg-navy-light p-8 text-center shadow-gold">
        <h2 className="font-display text-xl text-gold">{t.network.title}</h2>
        <p className="mt-3 text-sm text-white/70">{t.network.body}</p>
        <button
          type="button"
          disabled={isPending}
          onClick={() => switchChain({ chainId: SUPPORTED_CHAIN_ID })}
          className="mt-6 w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-navy transition hover:bg-gold-glow disabled:opacity-60"
        >
          {isPending ? t.network.switching : t.network.switch}
        </button>
      </div>
    </div>
  );
}
`);

w("src/components/Hero.tsx", `'use client';

import { useI18n } from "@/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-navy-card to-navy px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">BNB Smart Chain</p>
      <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-white md:text-5xl">
        {t.hero.title}
      </h1>
      <p className="mt-4 max-w-xl text-white/65">{t.hero.subtitle}</p>
      <a
        href="#private-sale"
        className="mt-8 inline-flex rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-gold transition hover:bg-gold-glow"
      >
        {t.hero.cta}
      </a>
    </section>
  );
}
`);

w("src/components/Stats.tsx", `'use client';

import { useI18n } from "@/i18n/context";
import { dappAbi } from "@/lib/abis";
import { env, hasContractConfig } from "@/lib/env";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gold/15 bg-navy-light/80 p-5">
      <p className="text-xs uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-2 font-display text-2xl text-gold">{value}</p>
    </div>
  );
}

function formatUsdt(raw: bigint | undefined): string {
  if (raw === undefined) return "—";
  return Number(formatUnits(raw, 18)).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function Stats() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const enabled = hasContractConfig();

  const { data: totalSale } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "totalPrivateSale",
    query: { enabled },
  });

  const { data: myContribution } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "userContribution",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const { data: vip } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "vipLevel",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const { data: team } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "teamPerformance",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const personal = isConnected ? formatUsdt(myContribution as bigint | undefined) : t.stats.connectHint;
  const vipStr = isConnected && vip !== undefined ? String(vip) : "—";
  const teamStr = isConnected ? formatUsdt(team as bigint | undefined) : "—";

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-white">{t.stats.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t.stats.totalSale} value={formatUsdt(totalSale as bigint | undefined)} />
        <StatCard label={t.stats.myContribution} value={personal} />
        <StatCard label={t.stats.vipLevel} value={vipStr} />
        <StatCard label={t.stats.teamPerformance} value={teamStr} />
      </div>
    </section>
  );
}
`);

w("src/components/PrivateSaleForm.tsx", `'use client';

import { useI18n } from "@/i18n/context";
import { dappAbi, erc20Abi } from "@/lib/abis";
import { env, hasContractConfig } from "@/lib/env";
import { isAddress, maxUint256, parseUnits } from "viem";
import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const MIN = 100;
const MAX = 5000;

export function PrivateSaleForm() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [inviter, setInviter] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const configured = hasContractConfig();

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: env.usdtAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address && configured ? [address, env.dappAddress] : undefined,
    query: { enabled: Boolean(address && configured) },
  });

  const { writeContract: writeApprove, data: approveHash, isPending: approving } = useWriteContract();
  const { writeContract: writeContribute, data: contributeHash, isPending: contributing } = useWriteContract();

  const { isLoading: approveConfirming } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: contributeConfirming } = useWaitForTransactionReceipt({ hash: contributeHash });

  const parsedAmount = amount.trim() ? parseUnits(amount.trim(), 18) : 0n;
  const needsApprove =
    configured &&
    allowance !== undefined &&
    parsedAmount > 0n &&
    (allowance as bigint) < parsedAmount;

  function validate(): bigint | null {
    setError(null);
    if (!configured) {
      setError(t.sale.configMissing);
      return null;
    }
    const n = Number(amount);
    if (!amount.trim() || Number.isNaN(n) || n < MIN || n > MAX) {
      setError(t.sale.invalidAmount);
      return null;
    }
    if (inviter.trim() && !isAddress(inviter.trim())) {
      setError(t.sale.invalidInviter);
      return null;
    }
    return parseUnits(amount.trim(), 18);
  }

  function onApprove() {
    const value = validate();
    if (!value || !configured) return;
    writeApprove(
      {
        address: env.usdtAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [env.dappAddress, maxUint256],
      },
      {
        onSuccess: () => {
          setMessage(t.sale.successApprove);
          refetchAllowance();
        },
      }
    );
  }

  function onContribute() {
    const value = validate();
    if (!value || !configured || !address) return;
    const inviterAddr = inviter.trim() ? (inviter.trim() as \`0x\${string}\`) : ("0x0000000000000000000000000000000000000000" as const);
    writeContribute(
      {
        address: env.dappAddress,
        abi: dappAbi,
        functionName: "contribute",
        args: [value, inviterAddr],
      },
      { onSuccess: () => setMessage(t.sale.successContribute) }
    );
  }

  const busy = approving || approveConfirming || contributing || contributeConfirming;

  return (
    <section id="private-sale" className="mt-12 scroll-mt-24">
      <div className="rounded-2xl border border-gold/20 bg-navy-card p-6 md:p-8">
        <h2 className="font-display text-2xl text-gold">{t.sale.title}</h2>
        <p className="mt-1 text-sm text-white/50">{t.sale.amountHint}</p>

        <label className="mt-6 block text-sm text-white/70">{t.sale.amount}</label>
        <input
          type="number"
          min={MIN}
          max={MAX}
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gold/25 bg-navy px-4 py-3 text-white outline-none focus:border-gold"
          placeholder="1000"
        />

        <label className="mt-4 block text-sm text-white/70">{t.sale.inviter}</label>
        <input
          type="text"
          value={inviter}
          onChange={(e) => setInviter(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gold/25 bg-navy px-4 py-3 text-white outline-none focus:border-gold"
          placeholder="0x..."
        />

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!isConnected || busy || !needsApprove}
            onClick={onApprove}
            className="flex-1 rounded-lg border border-gold/40 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {approving || approveConfirming ? t.sale.approving : t.sale.approve}
          </button>
          <button
            type="button"
            disabled={!isConnected || busy || needsApprove}
            onClick={onContribute}
            className="flex-1 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-navy transition hover:bg-gold-glow disabled:cursor-not-allowed disabled:opacity-40"
          >
            {contributing || contributeConfirming ? t.sale.contributing : t.sale.contribute}
          </button>
        </div>
      </div>
    </section>
  );
}
`);

w("src/app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #0a1628;
  --gold: #c9a227;
}

body {
  @apply min-h-screen bg-navy text-white antialiased;
  background-image: radial-gradient(ellipse at top, rgba(201, 162, 39, 0.08), transparent 55%);
}

.font-display {
  font-family: Georgia, "Times New Roman", serif;
}
`);

w("src/app/layout.tsx", `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { NetworkGuard } from "@/components/NetworkGuard";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Capital Syndicate | BSC Private Sale",
  description: "Institutional-grade private sale on BNB Smart Chain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${inter.variable} font-sans\`}>
        <Providers>
          <Header />
          <NetworkGuard />
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
`);

w("src/app/page.tsx", `import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { PrivateSaleForm } from "@/components/PrivateSaleForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <PrivateSaleForm />
    </>
  );
}
`);

console.log("Created files:\\n" + created.join("\\n"));
console.log("Total:", created.length);
