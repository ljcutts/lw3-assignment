import '../styles/globals.css'
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  const polygonChain = {
    id: 137,
    name: "Polygon Mainnet",
    network: "polygon",
    nativeCurrency: {
      decimals: 18,
      name: "Polygon",
      symbol: "Matic",
    },
    rpcUrls: {
      default: "https://polygon-rpc.com",
    },
    blockExplorers: {
      default: {
        name: "PolygonScan",
        url: "https://polygonscan.com",
      },
    },
    testnet: true,
  };
  const { chains, provider } = configureChains(
    [polygonChain],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== polygonChain.id) return null;
          return { http: chain.rpcUrls.default };
        },
      }),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "LW3 And BuildSpace NFT API",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  });

  
  return (
    <WagmiConfig
      client={wagmiClient}
    >
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp
