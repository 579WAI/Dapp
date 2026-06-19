"use client";

import { useI18n } from "@/i18n/context";
import { useWalletAuth } from "@/context/WalletAuthContext";

export function WalletVerifyPrompt() {
  const { t } = useI18n();
  const { isVerifying, isWatchOnly, verifyWallet } = useWalletAuth();

  return (
    <div className="rounded-2xl border border-gold/20 bg-navy-card p-8 text-center">
      <p className="text-sm leading-relaxed text-white/60">
        {isWatchOnly ? t.wallet.watchOnlyHint : t.wallet.verifyHint}
      </p>
      {!isWatchOnly ? (
        <button
          type="button"
          disabled={isVerifying}
          onClick={() => void verifyWallet()}
          className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy hover:bg-gold-glow disabled:opacity-50"
        >
          {isVerifying ? t.wallet.verifying : t.wallet.verify}
        </button>
      ) : null}
    </div>
  );
}
