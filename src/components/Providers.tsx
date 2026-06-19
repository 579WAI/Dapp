'use client';

import { wagmiConfig } from "@/lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import React, { useState } from "react";
import { WalletAuthProvider } from "@/context/WalletAuthContext";
import { I18nProvider } from "@/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <WalletAuthProvider>
          <I18nProvider>{children}</I18nProvider>
        </WalletAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
