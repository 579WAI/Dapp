import { isAddress } from "viem";

const ZERO = "0x0000000000000000000000000000000000000000";

export function parseInviterFromSearch(search: string): string {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const raw = params.get("inviter")?.trim();
  if (!raw || !isAddress(raw) || raw.toLowerCase() === ZERO) return "";
  return raw;
}

export function buildInviteLink(inviter: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("inviter", inviter);
  return url.toString();
}
