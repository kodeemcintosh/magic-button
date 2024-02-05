
import { configureChains, createConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { sepolia, mainnet, bsc, polygon, base, optimism } from "wagmi/chains";

const NETWORKS = [sepolia, mainnet, bsc, polygon, base, optimism];

const providers: Record<'INFURA' | 'ALCHEMY' | 'RPC', (key: string) => any> = {
  'INFURA': (apiKey: string) => infuraProvider({ apiKey }),
  'ALCHEMY': (apiKey: string) => alchemyProvider({ apiKey }),
  'RPC': () => jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${chain.id}.example.com`,
        webSocket: `wss://${chain.id}.example.com`,
      }),
    }),
}

export interface Provider {
  name: 'INFURA' | 'ALCHEMY' | 'RPC';
  key: string;
}
export interface Config {
  backupProvider: Provider;
}
export function initConfig({ backupProvider }: Config) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    NETWORKS,
    [publicProvider(), providers[backupProvider.name](backupProvider.key)],
    // [publicProvider(), infuraProvider({ apiKey: INFURA_API_KEY })],
  );

  const connector = new InjectedConnector({
    chains,
    options: {
      name: (detectedName) =>
        `Injected (${
          typeof detectedName === 'string'
            ? detectedName
            : detectedName.join(', ')
        })`,
        shimDisconnect: true
    }
  });
  // const metamaskConnector = new MetaMaskConnector({
  //   chains,
  //   options: {
  //     shimDisconnect: true,
  //     UNSTABLE_shimOnConnectSelectAccount: true,
  //   }
  // })

  return createConfig({
    autoConnect: true,
    connectors: [
      connector,
      // metamaskConnector
    ],
    publicClient,
    webSocketPublicClient
  });
}