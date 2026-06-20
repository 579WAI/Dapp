"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { CONTACT_URL } from "@/lib/contact";

type HeroProps = {
  onJoinClick: () => void;
};

export function Hero({ onJoinClick }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-navy-card to-navy px-6 py-14 md:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative flex justify-end">
        <Link
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gold/35 bg-navy/60 px-4 py-2 text-xs font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
        >
          {t.contact.button}
        </Link>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold/80">BNB Smart Chain</p>
      <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-white md:text-4xl">
        {t.hero.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-white/65">{t.hero.subtitle}</p>
      <div className="mt-8">
        <button
          type="button"
          onClick={onJoinClick}
          className="inline-flex rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-gold transition hover:bg-gold-glow"
        >
          {t.hero.cta}
        </button>
      </div>
    </section>
  );
}
