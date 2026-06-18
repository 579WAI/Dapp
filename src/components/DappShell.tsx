"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnnouncementModal } from "@/components/AnnouncementModal";
import { BottomNav, type AppTab } from "@/components/BottomNav";
import { DividendsClaim } from "@/components/DividendsClaim";
import { Hero } from "@/components/Hero";
import { JoinStats } from "@/components/JoinStats";
import { PrivateSaleModal } from "@/components/PrivateSaleModal";
import { TeamTab } from "@/components/TeamTab";
import { parseInviterFromSearch } from "@/lib/inviter";

/** 公告总开关：true = 每次进入都弹；false = 完全不弹 */
const ANNOUNCEMENT_ENABLED = true;

function DappShellInner() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<AppTab>("join");
  const [saleOpen, setSaleOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);

  const inviterFromUrl = useMemo(() => {
    const q = searchParams.toString();
    return q ? parseInviterFromSearch(`?${q}`) : "";
  }, [searchParams]);

  useEffect(() => {
    if (ANNOUNCEMENT_ENABLED) {
      setAnnouncementOpen(true);
      return;
    }
    if (inviterFromUrl) setSaleOpen(true);
  }, [inviterFromUrl]);

  const closeAnnouncement = () => {
    setAnnouncementOpen(false);
    if (inviterFromUrl) setSaleOpen(true);
  };

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

      {ANNOUNCEMENT_ENABLED && (
        <AnnouncementModal open={announcementOpen} onClose={closeAnnouncement} />
      )}

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
