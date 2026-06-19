"use client";

import { useI18n } from "@/i18n/context";
import { WalletVerifyPrompt } from "@/components/WalletVerifyPrompt";
import { useWalletAuth } from "@/context/WalletAuthContext";
import { dappAbi, tokenAbi } from "@/lib/abis";
import { env, hasContractConfig } from "@/lib/env";
import { formatUnits } from "viem";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function fmtAmount(value: bigint | undefined, decimals: number, symbol: string) {
  if (value === undefined) return "—";
  return `${formatUnits(value, decimals)} ${symbol}`;
}

type DividendsClaimProps = {
  embedded?: boolean;
};

export function DividendsClaim({ embedded = false }: DividendsClaimProps) {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const { isVerified } = useWalletAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const configured = hasContractConfig();
  const canReadPersonal = Boolean(address && configured && isVerified);

  const { data: pendingVip, refetch: refetchPendingVip } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "pendingVipUsdt",
    args: address && configured ? [address] : undefined,
    query: { enabled: canReadPersonal },
  });

  const { data: pendingHolder, refetch: refetchPendingHolder } = useReadContract({
    address: env.tokenAddress,
    abi: tokenAbi,
    functionName: "pendingHolderUsdt",
    args: address && configured ? [address] : undefined,
    query: { enabled: canReadPersonal },
  });

  const { data: pendingLp, refetch: refetchPendingLp } = useReadContract({
    address: env.tokenAddress,
    abi: tokenAbi,
    functionName: "pendingLpCs",
    args: address && configured ? [address] : undefined,
    query: { enabled: canReadPersonal },
  });

  const refreshPendingBalances = useCallback(async () => {
    await Promise.all([refetchPendingVip(), refetchPendingHolder(), refetchPendingLp()]);
  }, [refetchPendingVip, refetchPendingHolder, refetchPendingLp]);

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: confirming, isSuccess: receiptOk } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: Boolean(txHash) },
  });

  useEffect(() => {
    if (!txHash || !receiptOk) return;
    void refreshPendingBalances();
    setMessage(t.dividends.claimSuccess);
  }, [txHash, receiptOk, refreshPendingBalances, t.dividends.claimSuccess]);

  function parseTxError(err: unknown): string {
    const parts = [
      err instanceof Error ? err.message : String(err),
      (err as { shortMessage?: string })?.shortMessage,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (parts.includes("nothing to claim")) return t.dividends.nothingToClaim;
    if (parts.includes("user rejected")) return t.sale.userRejected;
    return t.dividends.claimFailed;
  }

  function claim(
    address_: `0x${string}`,
    abi: typeof dappAbi | typeof tokenAbi,
    functionName: "claimVipUsdt" | "claimHolderUsdt" | "claimLpCs"
  ) {
    setError(null);
    setMessage(null);
    writeContract(
      { address: address_, abi, functionName, args: [] },
      { onError: (err) => setError(parseTxError(err)) }
    );
  }

  const busy = isPending || confirming;

  function canClaim(value: bigint | undefined): boolean {
    return value !== undefined && value > 0n;
  }

  return (
    <section id="dividends" className={embedded ? "" : "mt-12 scroll-mt-24"}>
      <div className="rounded-2xl border border-gold/20 bg-navy-card p-6 md:p-8">
        <h2 className="font-display text-2xl text-gold">{t.dividends.title}</h2>
        <p className="mt-1 text-sm text-white/50">{t.dividends.subtitle}</p>

        {!configured && <p className="mt-4 text-sm text-red-400">{t.sale.configMissing}</p>}
        {configured && isConnected && !isVerified ? (
          <div className="mt-4">
            <WalletVerifyPrompt />
          </div>
        ) : null}

        {(!isConnected || isVerified) && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-white/10 bg-navy/60 p-4">
            <p className="text-sm text-white/60">{t.dividends.vipUsdt}</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {isVerified
                ? fmtAmount(pendingVip as bigint | undefined, 18, "USDT")
                : "—"}
            </p>
            <button
              type="button"
              disabled={!isVerified || busy || !configured || !canClaim(pendingVip as bigint | undefined)}
              onClick={() => claim(env.dappAddress, dappAbi, "claimVipUsdt")}
              className="mt-3 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy disabled:opacity-40"
            >
              {busy ? t.dividends.claiming : t.dividends.claimVip}
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-navy/60 p-4">
            <p className="text-sm text-white/60">{t.dividends.holderUsdt}</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {fmtAmount(pendingHolder as bigint | undefined, 18, "USDT")}
            </p>
            <button
              type="button"
              disabled={!isVerified || busy || !configured || !canClaim(pendingHolder as bigint | undefined)}
              onClick={() => claim(env.tokenAddress, tokenAbi, "claimHolderUsdt")}
              className="mt-3 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy disabled:opacity-40"
            >
              {busy ? t.dividends.claiming : t.dividends.claimHolder}
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-navy/60 p-4">
            <p className="text-sm text-white/60">{t.dividends.lpCs}</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {fmtAmount(pendingLp as bigint | undefined, 18, "CS")}
            </p>
            <button
              type="button"
              disabled={!isVerified || busy || !configured || !canClaim(pendingLp as bigint | undefined)}
              onClick={() => claim(env.tokenAddress, tokenAbi, "claimLpCs")}
              className="mt-3 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy disabled:opacity-40"
            >
              {busy ? t.dividends.claiming : t.dividends.claimLp}
            </button>
          </div>
        </div>
        )}

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}
      </div>
    </section>
  );
}
