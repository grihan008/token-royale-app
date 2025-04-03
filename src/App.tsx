import './App.css';
import { Address, TonClient } from '@ton/ton';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { TokenRoyale } from './contract-wrappers/TokenRoyale';
import { useEffect } from 'react';

const CONTRACT_ADDRESS = 'kQDl9NIpWF2EHQ-k9tauMbJPxBC7GtJpAnRFQ6acrGciIK24';

const getTokenRoyaleInstance = async () => {
  const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  });
  const address = Address.parse(CONTRACT_ADDRESS);
  const tokenRoyaleInstance = client.open(TokenRoyale.fromAddress(address));
  return tokenRoyaleInstance;
};

function App() {
  const getTimeStamps = async () => {
    const tokenRoyale = await getTokenRoyaleInstance();
    const timestamps = await tokenRoyale.getEliminationTimestamps();
    console.log('Timestamps:', timestamps);
  };

  useEffect(() => {
    getTimeStamps();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="https://grihan008.github.io/token-royale-app/tonconnect-manifest.json">
      <TonConnectButton />
    </TonConnectUIProvider>
  );
}

export default App;
