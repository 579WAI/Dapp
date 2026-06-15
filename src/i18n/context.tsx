'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Locale, strings } from "./strings";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof strings)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", l);
    }
  }, []);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "zh") setLocaleState(saved);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: strings[locale] }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
