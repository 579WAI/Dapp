"use client";

import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWalletAuth } from "@/context/WalletAuthContext";
import { useI18n } from "@/i18n/context";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { t } = useI18n();
  const { isVerified, isVerifying, isWatchOnly, verifyWallet } = useWalletAuth();

  const injectedConnector = connectors.find((c) => c.id === "injected") ?? connectors[0];

  useEffect(() => {
    if (isConnected && address && !isVerified && !isVerifying && !isWatchOnly) {
      void verifyWallet();
    }
  }, [isConnected, address, isVerified, isVerifying, isWatchOnly, verifyWallet]);

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-white/70 sm:inline">{short}</span>
          {!isVerified && !isWatchOnly ? (
            <button
              type="button"
              disabled={isVerifying}
              onClick={() => void verifyWallet()}
              className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
            >
              {isVerifying ? t.wallet.verifying : t.wallet.verify}
            </button>
          ) : null}
          {isVerified ? (
            <span className="rounded-full border border-emerald-400/30 px-2 py-1 text-[10px] text-emerald-300">
              {t.wallet.verified}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => disconnect()}
            className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/20"
          >
            {t.wallet.disconnect}
          </button>
        </div>
        {isWatchOnly ? (
          <span className="max-w-[12rem] text-right text-[10px] leading-tight text-amber-300">
            {t.wallet.watchOnlyHint}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!injectedConnector || isPending}
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      className="rounded-full border border-gold/40 bg-gold px-3 py-1.5 text-xs font-medium text-navy hover:bg-gold/90 disabled:opacity-50"
    >
      {isPending ? t.wallet.connecting : t.wallet.connect}
    </button>
  );
}
