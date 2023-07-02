import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

function App() {
  const { connect, connectors } = useConnect();
  const sequence = connectors[0];
  const { disconnect } = useDisconnect();

  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: polygonMumbai.id });

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => connect({ connector: sequence })}>Connect</button>
      )}

      {switchNetwork && <button onClick={() => switchNetwork()}>Switch to Mumbai</button>}

      <pre>{JSON.stringify({ isConnected, address, chain }, null, 2)}</pre>
    </div>
  );
}

export default App;
