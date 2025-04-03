import './App.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://grihan008.github.io/token-royale-app/tonconnect-manifest.json">
      <TonConnectButton />
    </TonConnectUIProvider>
  );
}

export default App;
