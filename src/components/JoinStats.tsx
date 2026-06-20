"use client";

import { useI18n } from "@/i18n/context";
import { useWalletAuth } from "@/context/WalletAuthContext";
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
  const { isVerified } = useWalletAuth();
  const enabled = hasContractConfig();
  const canReadPersonal = enabled && Boolean(address) && isVerified;

  const { data: teamPerf } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "teamPerformance",
    args: address ? [address] : undefined,
    query: { enabled: canReadPersonal },
  });

  const { data: myContribution } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled: canReadPersonal },
  });

  const teamPerformance = isVerified
    ? formatUsdt(teamPerf as bigint | undefined)
    : isConnected
      ? t.wallet.verifyHint
      : t.stats.connectHint;

  const personal = isVerified
    ? formatUsdt(myContribution as bigint | undefined)
    : isConnected
      ? t.wallet.verifyHint
      : t.stats.connectHint;

  return (
    <section className="mt-8">
      <h2 className="font-display text-xl text-white">{t.stats.title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <StatCard label={t.stats.totalSale} value={teamPerformance} />
        <StatCard label={t.stats.myContribution} value={personal} />
      </div>
    </section>
  );
}
