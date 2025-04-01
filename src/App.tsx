import './App.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://tonconnect.github.io/tonconnect-manifest/manifest.json">
      <TonConnectButton />
    </TonConnectUIProvider>
  );
}

export default App;
