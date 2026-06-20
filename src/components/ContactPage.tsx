"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { CONTACT_QR_IMAGE, CONTACT_URL } from "@/lib/contact";

export function ContactPage() {
  const { t } = useI18n();

  return (
    <section className="pb-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-white">{t.contact.title}</h1>
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-gold/30 px-3 py-1.5 text-xs text-gold transition hover:bg-gold/10"
        >
          {t.contact.backHome}
        </Link>
      </div>

      <p className="text-sm leading-relaxed text-white/65">{t.contact.subtitle}</p>

      <div className="mx-auto mt-8 max-w-xs overflow-hidden rounded-2xl border border-gold/20 bg-white/5 p-3 shadow-gold">
        <Image
          src={CONTACT_QR_IMAGE}
          alt={t.contact.qrAlt}
          width={360}
          height={640}
          className="h-auto w-full rounded-xl"
          priority
        />
      </div>

      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-glow"
      >
        {t.contact.openDebox}
      </a>

      <p className="mt-4 break-all text-center text-xs text-white/40">{CONTACT_URL}</p>
    </section>
  );
}
