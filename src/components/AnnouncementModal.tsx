"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/context";

type AnnouncementModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AnnouncementModal({ open, onClose }: AnnouncementModalProps) {
  const { t } = useI18n();

  // 弹窗打开时禁止背景滚动（与 PrivateSaleModal 一致）
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 sm:items-center">
      {/* 点遮罩关闭 */}
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={onClose} />

      <div className="relative z-10 flex w-full max-w-md max-h-[85vh] flex-col rounded-2xl border border-gold/25 bg-navy-card p-6 shadow-gold">
        {/* 标题栏 */}
        <div className="flex shrink-0 items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-gold">{t.announcement.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* 长文滚动区：关键在这里 */}
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 text-sm leading-6 text-white/80 whitespace-pre-line">
          {t.announcement.body}
        </div>

        {/* 底部按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full shrink-0 rounded-xl bg-gold py-3 font-semibold text-navy"
        >
          {t.announcement.confirm}
        </button>
      </div>
    </div>
  );
}
