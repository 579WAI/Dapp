"use client";

import { useI18n } from "@/i18n/context";

type HeroProps = {
  onJoinClick: () => void;
};

export function Hero({ onJoinClick }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-navy-card to-navy px-6 py-14 md:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">BNB Smart Chain</p>
      <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-white md:text-4xl">
        {t.hero.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-white/65">{t.hero.subtitle}</p>
      <button
        type="button"
        onClick={onJoinClick}
        className="mt-8 inline-flex rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-gold transition hover:bg-gold-glow"
      >
        {t.hero.cta}
      </button>
    </section>
  );
}
