'use client';

import { ConnectWallet } from "@/components/ConnectWallet";
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
              className={`rounded-full px-2.5 py-1 ${locale === "en" ? "bg-gold text-navy" : "text-white/70"}`}
            >
              {t.lang.en}
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={`rounded-full px-2.5 py-1 ${locale === "zh" ? "bg-gold text-navy" : "text-white/70"}`}
            >
              {t.lang.zh}
            </button>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
