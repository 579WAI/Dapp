const fs = require("fs");
const path = require("path");
const root = "C:/Users/Administrator/Desktop/blockchain-dapp/frontend";
const w = (rel, content) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
};

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
);

w(
  "src/components/NetworkGuard.tsx",
  `"use client";

import { useAccount, useSwitchChain } from "wagmi";
import { bsc } from "viem/chains";
import { useI18n } from "@/lib/i18n";

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { t } = useI18n();

  if (isConnected && chainId !== bsc.id) {
    return (
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 text-center">
        <p className="mb-4 text-amber-200">{t.wrongNetwork}</p>
        <button
          className="rounded-full bg-gold px-6 py-2 font-medium text-navy"
          onClick={() => switchChain({ chainId: bsc.id })}
        >
          Switch to BSC
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
`
);

w(
  "src/components/StatsPanel.tsx",
  `"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { config } from "@/lib/config";
import { dappAbi } from "@/lib/abis";
import { useI18n, vipLabel } from "@/lib/i18n";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gold">{value}</p>
    </div>
  );
}

export function StatsPanel() {
  const { t } = useI18n();
  const { address } = useAccount();

  const { data: totalRaised } = useReadContract({
    address: config.dappAddress,
    abi: dappAbi,
    functionName: "totalPrivateSaleUsdt",
  });

  const { data: myTotal } = useReadContract({
    address: config.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: vipLevel } = useReadContract({
    address: config.dappAddress,
    abi: dappAbi,
    functionName: "getEffectiveVipLevel",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: performance } = useReadContract({
    address: config.dappAddress,
    abi: dappAbi,
    functionName: "teamPerformance",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard label={t.totalRaised} value={totalRaised ? \`\${Number(formatUnits(totalRaised, 18)).toLocaleString()} USDT\` : "—"} />
      <StatCard label={t.myContribution} value={myTotal ? \`\${Number(formatUnits(myTotal, 18)).toLocaleString()} USDT\` : address ? "0 USDT" : "—"} />
      <StatCard label={t.vipLevel} value={vipLevel !== undefined ? vipLabel(Number(vipLevel), t) : "—"} />
      <StatCard label={t.performance} value={performance ? \`\${Number(formatUnits(performance, 18)).toLocaleString()} USDT\` : "—"} />
    </section>
  );
}
`
);

w(
  "src/components/PrivateSale.tsx",
  `"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { maxUint256, parseUnits, zeroAddress } from "viem";
import { config } from "@/lib/config";
import { dappAbi, erc20Abi } from "@/lib/abis";
import { useI18n } from "@/lib/i18n";
import { NetworkGuard } from "./NetworkGuard";

export function PrivateSale() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("100");
  const [inviter, setInviter] = useState("");

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: config.usdtAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, config.dappAddress] : undefined,
    query: { enabled: !!address },
  });

  const { data: myTotal } = useReadContract({
    address: config.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: confirming } = useWaitForTransactionReceipt({ hash: txHash });

  const parsedAmount = (() => {
    try {
      return parseUnits(amount || "0", 18);
    } catch {
      return 0n;
    }
  })();

  const needsApproval = allowance !== undefined && parsedAmount > 0n && allowance < parsedAmount;
  const cumulativeOk = myTotal !== undefined ? myTotal + parsedAmount <= config.maxCumulative : true;
  const rangeOk = parsedAmount >= config.minPrivateSale && parsedAmount <= config.maxPrivateSale;

  const onApprove = () => {
    writeContract({
      address: config.usdtAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [config.dappAddress, maxUint256],
    });
  };

  const onPrivateSale = () => {
    const inviterAddr = inviter.trim() === "" ? zeroAddress : (inviter.trim() as \`0x\${string}\`);
    writeContract({
      address: config.dappAddress,
      abi: dappAbi,
      functionName: "privateSale",
      args: [parsedAmount, inviterAddr],
    });
  };

  return (
    <NetworkGuard>
      <section className="glass rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-gold">{t.privateSale}</h2>
        <p className="mt-2 text-sm text-white/60">{t.minMax}</p>

        {!isConnected ? (
          <p className="mt-8 text-white/70">{t.connect}</p>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-white/70">{t.amount}</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-gold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100 - 5000"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">{t.inviter}</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-gold"
                value={inviter}
                onChange={(e) => setInviter(e.target.value)}
                placeholder="0x..."
              />
            </div>

            {!rangeOk && parsedAmount > 0n && (
              <p className="text-sm text-red-400">Amount must be between 100 and 5000 USDT.</p>
            )}
            {!cumulativeOk && (
              <p className="text-sm text-red-400">Cumulative private sale cap is 5000 USDT.</p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {needsApproval && (
                <button
                  className="rounded-full bg-white/10 px-6 py-3 hover:bg-white/20 disabled:opacity-50"
                  disabled={isPending || confirming}
                  onClick={onApprove}
                >
                  {t.approve}
                </button>
              )}
              <button
                className="rounded-full bg-gold px-8 py-3 font-semibold text-navy disabled:opacity-50"
                disabled={isPending || confirming || needsApproval || !rangeOk || !cumulativeOk || parsedAmount === 0n}
                onClick={onPrivateSale}
              >
                {isPending || confirming ? "..." : t.participate}
              </button>
            </div>
          </div>
        )}
      </section>
    </NetworkGuard>
  );
}
`
);

w(
  "src/components/Hero.tsx",
  `"use client";

import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/80 to-navy p-10 md:p-14">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <p className="text-sm uppercase tracking-[0.3em] text-gold/80">BSC Mainnet</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">{t.heroTitle}</h1>
      <p className="mt-4 max-w-xl text-white/70">{t.heroDesc}</p>
    </section>
  );
}
`
);

w(
  "src/app/layout.tsx",
  `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ChainScale Protocol",
  description: "BSC Token Private Sale DApp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Header />
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
`
);

w(
  "src/app/page.tsx",
  `import { Hero } from "@/components/Hero";
import { StatsPanel } from "@/components/StatsPanel";
import { PrivateSale } from "@/components/PrivateSale";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <StatsPanel />
      <PrivateSale />
    </div>
  );
}
`
);

w(
  "README.md",
  `# CS DApp Frontend

Next.js 14 + wagmi + Reown AppKit (MetaMask & WalletConnect) for BSC mainnet.

## Setup

1. Copy \`.env.example\` to \`.env.local\`
2. Set \`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID\` from https://cloud.reown.com/
3. Set deployed \`NEXT_PUBLIC_DAPP_ADDRESS\` and \`NEXT_PUBLIC_TOKEN_ADDRESS\`

## Run

\`\`\`bash
npm install
npm run dev
\`\`\`

## Production

\`\`\`bash
npm run build
npm start
\`\`\`
`
);

console.log("Frontend part 2 done");
