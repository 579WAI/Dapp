import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { bsc } from "viem/chains";

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [injected()],
  transports: {
    [bsc.id]: http(),
  },
  ssr: true,
});
