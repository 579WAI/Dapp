"use client";

import { useI18n } from "@/i18n/context";
import { WalletVerifyPrompt } from "@/components/WalletVerifyPrompt";
import { useWalletAuth } from "@/context/WalletAuthContext";
import { dappAbi } from "@/lib/abis";
import { buildInviteLink } from "@/lib/inviter";
import { env, hasContractConfig } from "@/lib/env";
import { MIN_DIRECT_REFERRALS, directsProgressPct, nextVipTarget, progressPct } from "@/lib/vip";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useState } from "react";

const ZERO = "0x0000000000000000000000000000000000000000";

function formatUsdt(raw: bigint | undefined): string {
  if (raw === undefined) return "—";
  return Number(formatUnits(raw, 18)).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function ProgressRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-white/60">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy">
        <div className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold transition-all" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
    </div>
  );
}

function GridStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gold/15 bg-navy-light/60 p-4">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function TeamTab() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const { isVerified } = useWalletAuth();
  const configured = hasContractConfig();
  const [copyMsg, setCopyMsg] = useState<string | null>(null);
  const enabled = configured && Boolean(address) && isVerified;

  const { data: vipLevel } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "getEffectiveVipLevel",
    args: address ? [address] : undefined,
    query: { enabled },
  });
  const { data: teamPerf } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "teamPerformance",
    args: address ? [address] : undefined,
    query: { enabled },
  });
  const { data: mySale } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled },
  });
  const { data: directs } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "directReferralCount",
    args: address ? [address] : undefined,
    query: { enabled },
  });
  const { data: myInviter } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "inviter",
    args: address ? [address] : undefined,
    query: { enabled },
  });
  const { data: participated } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "hasParticipated",
    args: address ? [address] : undefined,
    query: { enabled },
  });

  const level = Number(vipLevel ?? 0);
  const directCount = Number(directs ?? 0n);
  const perf = (teamPerf as bigint | undefined) ?? 0n;
  const target = nextVipTarget(level);

  async function copyInviteLink() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(buildInviteLink(address));
      setCopyMsg(t.team.linkCopied);
      setTimeout(() => setCopyMsg(null), 2500);
    } catch {
      setCopyMsg(t.team.linkCopyFailed);
    }
  }

  if (!isConnected) {
    return (
      <div className="rounded-2xl border border-gold/20 bg-navy-card p-8 text-center">
        <p className="text-white/60">{t.stats.connectHint}</p>
      </div>
    );
  }
  if (!isVerified) {
    return <WalletVerifyPrompt />;
  }
  if (!configured) return <p className="text-sm text-red-400">{t.sale.configMissing}</p>;

  const inviterAddr = myInviter as string | undefined;
  const inviterDisplay =
    participated && inviterAddr && inviterAddr.toLowerCase() !== ZERO ? shortAddr(inviterAddr) : t.team.inviterUnbound;

  return (
    <div className="space-y-4 pb-4">
      <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-navy-card to-navy-light p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-white/50">{t.team.vipRoute}</p>
            <p className="mt-1 font-display text-4xl text-white">VIP{level}</p>
            <p className="mt-2 text-sm text-white/55">{t.team.directReferrals}: {directCount}</p>
          </div>
          <button type="button" onClick={copyInviteLink} className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-navy hover:bg-gold-glow">
            {t.team.copyInviteLink}
          </button>
        </div>
        {copyMsg && <p className="mt-2 text-xs text-emerald-400">{copyMsg}</p>}
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-card/80 px-4 py-3">
        <div>
          <p className="text-sm text-white/50">{t.team.myInviter}</p>
          <p className="font-medium text-white">{inviterDisplay}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GridStat label={t.team.personalSale} value={formatUsdt(mySale as bigint | undefined)} />
        <GridStat label={t.team.teamPerformance} value={formatUsdt(perf)} />
        <GridStat label={t.team.directReferrals} value={String(directCount)} />
        <GridStat label={t.stats.vipLevel} value={`VIP${level}`} />
      </div>
      <div className="rounded-2xl border border-gold/15 bg-navy-card p-5">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg text-gold">{t.team.vipProgress}</p>
          <span className="rounded-full border border-gold/30 px-2 py-0.5 text-xs text-gold">{t.team.currentVip}: VIP{level}</span>
        </div>
        {target ? (
          <>
            <p className="mt-3 text-sm text-white/80">{t.team.nextVip}: VIP{target.level} ({t.team.tierShare})</p>
            <ProgressRow label={t.team.teamPerformanceReq} value={`${formatUsdt(perf)} / ${formatUnits(target.usdt, 18)} USDT`} pct={progressPct(perf, target.usdt)} />
            <ProgressRow label={t.team.directReferralsReq} value={`${directCount} / ${MIN_DIRECT_REFERRALS}`} pct={directsProgressPct(directCount)} />
          </>
        ) : (
          <p className="mt-3 text-sm text-gold/90">{t.team.maxVip}</p>
        )}
        <p className="mt-4 rounded-lg bg-navy/80 px-3 py-2 text-xs leading-relaxed text-white/55">{t.team.vipRulesNote}</p>
      </div>
    </div>
  );
}
