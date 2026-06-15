import { parseUnits } from "viem";

export const MIN_DIRECT_REFERRALS = 10;

export const VIP_THRESHOLDS = [
  { level: 1, usdt: parseUnits("10000", 18) },
  { level: 2, usdt: parseUnits("30000", 18) },
  { level: 3, usdt: parseUnits("100000", 18) },
  { level: 4, usdt: parseUnits("300000", 18) },
  { level: 5, usdt: parseUnits("1000000", 18) },
] as const;

export function nextVipTarget(currentLevel: number) {
  if (currentLevel >= 5) return null;
  return VIP_THRESHOLDS[currentLevel];
}

export function progressPct(current: bigint, target: bigint): number {
  if (target === 0n) return 100;
  if (current >= target) return 100;
  return Number((current * 10000n) / target) / 100;
}

export function directsProgressPct(count: number): number {
  if (count >= MIN_DIRECT_REFERRALS) return 100;
  return (count / MIN_DIRECT_REFERRALS) * 100;
}
