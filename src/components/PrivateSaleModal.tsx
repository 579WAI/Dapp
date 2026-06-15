"use client";

import { useI18n } from "@/i18n/context";
import { dappAbi, erc20Abi } from "@/lib/abis";
import { env, hasContractConfig } from "@/lib/env";
import { isAddress, maxUint256, parseUnits } from "viem";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const MIN = 100;
const MAX = 5000;
const ZERO = "0x0000000000000000000000000000000000000000";

type PrivateSaleModalProps = {
  open: boolean;
  onClose: () => void;
  defaultInviter?: string;
};

export function PrivateSaleModal({ open, onClose, defaultInviter = "" }: PrivateSaleModalProps) {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [inviter, setInviter] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const configured = hasContractConfig();

  useEffect(() => {
    if (open && defaultInviter && isAddress(defaultInviter) && defaultInviter.toLowerCase() !== ZERO) {
      setInviter(defaultInviter);
    }
  }, [open, defaultInviter]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const readEnabled = Boolean(open && address && configured);

  const { data: myTotal } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "privateSaleTotal",
    args: address ? [address] : undefined,
    query: { enabled: readEnabled },
  });

  const { data: participated } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "hasParticipated",
    args: address ? [address] : undefined,
    query: { enabled: readEnabled },
  });

  const { data: boundInviter } = useReadContract({
    address: env.dappAddress,
    abi: dappAbi,
    functionName: "inviter",
    args: address ? [address] : undefined,
    query: { enabled: readEnabled && Boolean(participated) },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: env.usdtAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address && configured ? [address, env.dappAddress] : undefined,
    query: { enabled: Boolean(open && address && configured) },
  });

  const { writeContract: writeApprove, data: approveHash, isPending: approving } = useWriteContract();
  const { writeContract: writeContribute, data: contributeHash, isPending: contributing } = useWriteContract();

  const { isLoading: approveConfirming } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: contributeConfirming, isSuccess: contributeOk } = useWaitForTransactionReceipt({
    hash: contributeHash,
    query: { enabled: Boolean(contributeHash) },
  });

  useEffect(() => {
    if (!contributeHash || !contributeOk) return;
    setMessage(t.sale.successContribute);
  }, [contributeHash, contributeOk, t.sale.successContribute]);

  const parsedAmount = amount.trim() ? parseUnits(amount.trim(), 18) : 0n;
  const needsApprove =
    configured && allowance !== undefined && parsedAmount > 0n && (allowance as bigint) < parsedAmount;

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
    const value = parseUnits(amount.trim(), 18);
    const cap = parseUnits("5000", 18);
    const prev = (myTotal as bigint | undefined) ?? 0n;
    if (prev + value > cap) {
      setError(t.sale.cumulativeCap);
      return null;
    }
    return value;
  }

  function parseTxError(err: unknown): string {
    const parts = [
      err instanceof Error ? err.message : String(err),
      (err as { shortMessage?: string })?.shortMessage,
      (err as { details?: string })?.details,
      (err as { cause?: { message?: string } })?.cause?.message,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (parts.includes("user rejected") || parts.includes("rejected the request")) return t.sale.userRejected;
    if (
      parts.includes("safeerc20") ||
      parts.includes("transfer amount exceeds") ||
      parts.includes("erc20insufficientbalance") ||
      parts.includes("insufficient balance")
    ) {
      return t.sale.quotaFull;
    }
    if (parts.includes("amount out of range")) return t.sale.invalidAmount;
    if (parts.includes("cumulative cap")) return t.sale.cumulativeCap;
    if (parts.includes("invalid inviter")) return t.sale.invalidInviter;
    return t.sale.txFailed;
  }

  function onApprove() {
    const value = validate();
    if (!value || !configured) return;
    setMessage(null);
    writeApprove(
      { address: env.usdtAddress, abi: erc20Abi, functionName: "approve", args: [env.dappAddress, maxUint256] },
      {
        onSuccess: () => {
          setMessage(t.sale.successApprove);
          refetchAllowance();
        },
        onError: (err) => {
          const msg = parseTxError(err);
          setError(msg === t.sale.txFailed ? t.sale.approveFailed : msg);
        },
      }
    );
  }

  function onContribute() {
    const value = validate();
    if (!value || !configured || !address) return;
    const inviterAddr = inviter.trim()
      ? (inviter.trim() as `0x${string}`)
      : ("0x0000000000000000000000000000000000000000" as const);
    setMessage(null);
    writeContribute(
      { address: env.dappAddress, abi: dappAbi, functionName: "privateSale", args: [value, inviterAddr] },
      { onError: (err) => setError(parseTxError(err)) }
    );
  }

  const busy = approving || approveConfirming || contributing || contributeConfirming;
  const inviterLocked = Boolean(participated);
  const inviterDisplay =
    boundInviter && (boundInviter as string).toLowerCase() !== ZERO
      ? (boundInviter as string)
      : t.sale.inviterDefaultGod;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gold/25 bg-navy-card p-6 shadow-gold">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-gold">{t.sale.title}</h2>
            <p className="mt-1 text-sm text-white/50">{t.sale.amountHint}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Close">
            x
          </button>
        </div>
        <label className="mt-6 block text-sm text-white/70">{t.sale.amount}</label>
        <input type="number" min={MIN} max={MAX} step="any" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-2 w-full rounded-lg border border-gold/25 bg-navy px-4 py-3 text-white outline-none focus:border-gold" placeholder="1000" />
        <label className="mt-4 block text-sm text-white/70">{t.sale.inviter}</label>
        {inviterLocked ? (
          <div className="mt-2 rounded-lg border border-white/10 bg-navy/80 px-4 py-3 text-sm text-white/80 break-all">
            {inviterDisplay}
          </div>
        ) : (
          <input
            type="text"
            value={inviter}
            onChange={(e) => setInviter(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gold/25 bg-navy px-4 py-3 text-white outline-none focus:border-gold"
            placeholder="0x..."
          />
        )}
        {inviterLocked ? (
          <p className="mt-1 text-xs text-white/45">{t.sale.inviterLocked}</p>
        ) : (
          defaultInviter &&
          inviter.toLowerCase() === defaultInviter.toLowerCase() && (
            <p className="mt-1 text-xs text-gold/80">{t.sale.inviterFromLink}</p>
          )
        )}
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}
        <div className="mt-6 flex flex-col gap-3">
          <button type="button" disabled={!isConnected || busy || !needsApprove} onClick={onApprove} className="w-full rounded-lg border border-gold/40 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40">
            {approving || approveConfirming ? t.sale.approving : t.sale.approve}
          </button>
          <button type="button" disabled={!isConnected || busy || needsApprove} onClick={onContribute} className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-navy transition hover:bg-gold-glow disabled:cursor-not-allowed disabled:opacity-40">
            {contributing || contributeConfirming ? t.sale.contributing : t.sale.contribute}
          </button>
        </div>
      </div>
    </div>
  );
}
