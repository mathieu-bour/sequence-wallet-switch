import { SequenceConnector } from '@0xsequence/wagmi-connector';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App.tsx';

const chain = polygon;
const { chains, publicClient, webSocketPublicClient } = configureChains([chain], [publicProvider()]);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new SequenceConnector({
      chains,
      options: {
        defaultNetwork: chain.id,
        connect: {
          app: 'Demo',
          // walletAppURL: 'https://sequence.app', // We should not have to explicitely specify the Sequence Wallet URL
        },
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
);
