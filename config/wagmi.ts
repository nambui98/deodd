import type { Chain, Client, Connector } from 'wagmi';
import { configureChains, createClient } from 'wagmi';
import { bscTestnet, bsc } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider, webSocketProvider }: any = configureChains(
  [process.env.NEXT_PUBLIC_ENVIRONMENT_BLOCKCHAIN === "MAINNET" ? bsc : bscTestnet],
  [publicProvider()]
);
// const needsInjectedWalletFallback =
//   typeof window !== 'undefined' &&
//   window.ethereum &&
//   !window.ethereum.isMetaMask &&
//   !window.ethereum.isCoinbaseWallet;
const connectors: Connector<any, any, any>[] = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
];
export const wagmiClient: Client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
