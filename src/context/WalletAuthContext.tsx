"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAccount, useSignMessage } from "wagmi";

const STORAGE_KEY = "579wai_wallet_auth";

type StoredAuth = {
  address: string;
  nonce: string;
};

type WalletAuthContextValue = {
  isVerified: boolean;
  isVerifying: boolean;
  isWatchOnly: boolean;
  verifyWallet: () => Promise<boolean>;
};

const WalletAuthContext = createContext<WalletAuthContextValue | null>(null);

function buildSignMessage(address: string, nonce: string) {
  return [
    "579WAI Wallet Verification",
    `Address: ${address}`,
    `Nonce: ${nonce}`,
    "",
    "Sign to view your personal data. Watch-only wallets cannot sign.",
  ].join("\n");
}

export function WalletAuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isWatchOnly, setIsWatchOnly] = useState(false);

  const clearVerification = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsVerified(false);
    setIsWatchOnly(false);
  }, []);

  useEffect(() => {
    if (!isConnected || !address) {
      clearVerification();
      return;
    }

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredAuth;
      if (parsed.address?.toLowerCase() === address.toLowerCase()) {
        setIsVerified(true);
        setIsWatchOnly(false);
      } else {
        clearVerification();
      }
    } catch {
      clearVerification();
    }
  }, [isConnected, address, clearVerification]);

  const verifyWallet = useCallback(async () => {
    if (!address) return false;

    setIsVerifying(true);
    setIsWatchOnly(false);

    try {
      const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      await signMessageAsync({ message: buildSignMessage(address, nonce) });
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ address, nonce } satisfies StoredAuth));
      setIsVerified(true);
      return true;
    } catch (err) {
      setIsVerified(false);
      sessionStorage.removeItem(STORAGE_KEY);
      const text = [
        err instanceof Error ? err.message : String(err),
        (err as { shortMessage?: string })?.shortMessage,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (
        /reject|denied|cancel|watch|not supported|cannot sign|no permission|readonly|read-only/.test(text)
      ) {
        setIsWatchOnly(true);
      }
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [address, signMessageAsync]);

  const value = useMemo(
    () => ({ isVerified, isVerifying, isWatchOnly, verifyWallet }),
    [isVerified, isVerifying, isWatchOnly, verifyWallet]
  );

  return <WalletAuthContext.Provider value={value}>{children}</WalletAuthContext.Provider>;
}

export function useWalletAuth() {
  const ctx = useContext(WalletAuthContext);
  if (!ctx) {
    throw new Error("useWalletAuth must be used within WalletAuthProvider");
  }
  return ctx;
}
