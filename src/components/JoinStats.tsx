"use client";

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

export function JoinStats() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const enabled = hasContractConfig();

  
  const { data: totalSale } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "totalPrivateSaleUsdt",
    query: { enabled },
  });

  const { data: myContribution } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const personal = isConnected ? formatUsdt(myContribution as bigint | undefined) : t.stats.connectHint;
  const chainAmount = totalSale ? Number(formatUnits(totalSale as bigint, 18)) : 0;
  const displayTotal = 78000 + chainAmount;
  
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl text-white">{t.stats.title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/*<StatCard label={t.stats.totalSale} value={formatUsdt(totalSale as bigint | undefined)} />*/}
        <StatCard
          label={t.stats.totalSale}
          value={displayTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        />
        <StatCard label={t.stats.myContribution} value={personal} />
      </div>
    </section>
  );
}
