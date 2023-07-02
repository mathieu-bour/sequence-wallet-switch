import { SequenceConnector } from '@0xsequence/wagmi-connector';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { polygonMumbai } from 'viem/chains';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import App from './App.tsx';

const { chains, publicClient, webSocketPublicClient } = configureChains([polygonMumbai], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    // @ts-expect-error Sequence Connector typings are outdated
    new SequenceConnector({
      chains,
      options: {
        connect: {
          app: 'Demo',
          networkId: polygonMumbai.id, // 80001
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
