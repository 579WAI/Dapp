"use client";

import { useI18n } from "@/i18n/context";

export type AppTab = "join" | "assets" | "team";

type BottomNavProps = {
  active: AppTab;
  onChange: (tab: AppTab) => void;
};

function TabIcon({ tab }: { tab: AppTab }) {
  if (tab === "join") {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    );
  }
  if (tab === "assets") {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5V12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const { t } = useI18n();
  const tabs: AppTab[] = ["join", "assets", "team"];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/20 bg-navy/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg">
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs transition ${
                isActive ? "text-gold" : "text-white/45 hover:text-white/70"
              }`}
            >
              <TabIcon tab={tab} />
              <span className={isActive ? "font-semibold" : ""}>{t.tabs[tab]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
