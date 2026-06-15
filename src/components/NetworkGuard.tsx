'use client';

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
