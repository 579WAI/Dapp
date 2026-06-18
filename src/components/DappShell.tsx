"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BottomNav, type AppTab } from "@/components/BottomNav";
import { DividendsClaim } from "@/components/DividendsClaim";
import { Hero } from "@/components/Hero";
import { JoinStats } from "@/components/JoinStats";
import { PrivateSaleModal } from "@/components/PrivateSaleModal";
import { TeamTab } from "@/components/TeamTab";
import { parseInviterFromSearch } from "@/lib/inviter";

import { AnnouncementModal } from "@/components/AnnouncementModal";

const ANNOUNCEMENT_KEY = "announcement-dismissed-v1";

export function DappShell() {
  const [tab, setTab] = useState<AppTab>("join");
  const [saleOpen, setSaleOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);

  useEffect(() => {
    setAnnouncementOpen(true)
  }, []);

  return (
    <>
      {/* 原有页面内容 */}

      <AnnouncementModal
        open={announcementOpen}
        onClose={() => {
          localStorage.setItem(ANNOUNCEMENT_KEY, "1");
          setAnnouncementOpen(false);
        }}
      />

      <PrivateSaleModal ... />
      <BottomNav ... />
    </>
  );
}


function DappShellInner() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<AppTab>("join");
  const [saleOpen, setSaleOpen] = useState(false);

  const inviterFromUrl = useMemo(() => {
    const q = searchParams.toString();
    return q ? parseInviterFromSearch(`?${q}`) : "";
  }, [searchParams]);

  useEffect(() => {
    if (inviterFromUrl) setSaleOpen(true);
  }, [inviterFromUrl]);

  return (
    <>
      {tab === "join" && (
        <>
          <Hero onJoinClick={() => setSaleOpen(true)} />
          <JoinStats />
        </>
      )}
      {tab === "assets" && <DividendsClaim embedded />}
      {tab === "team" && <TeamTab />}

      <PrivateSaleModal
        open={saleOpen}
        onClose={() => setSaleOpen(false)}
        defaultInviter={inviterFromUrl}
      />
      <BottomNav active={tab} onChange={setTab} />
    </>
  );
}

export function DappShell() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-white/50">Loading…</div>}>
      <DappShellInner />
    </Suspense>
  );
}
