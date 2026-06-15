'use client';

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = connectors.find((c) => c.id === "injected") ?? connectors[0];

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-white/70 sm:inline">{short}</span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/20"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!injectedConnector || isPending}
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      className="rounded-full border border-gold/40 bg-gold px-3 py-1.5 text-xs font-medium text-navy hover:bg-gold/90 disabled:opacity-50"
    >
      {isPending ? "Connecting…" : "Connect MetaMask"}
    </button>
  );
}
