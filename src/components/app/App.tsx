import classes from './App.module.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from '../game/Game';
import tokenRoyaleLogo from '/favicon.jpg';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://grihan008.github.io/token-royale-app/tonconnect-manifest.json">
      <div className={classes.page}>
        <nav className={classes.navbar}>
          <div className={`${classes.container} ${classes.navbarContainer}`}>
            <img
              src={tokenRoyaleLogo}
              alt="Logo"
              className={classes.logo}
              width="40"
            />
            <TonConnectButton />
          </div>
        </nav>
        <main className={classes.main}>
          <Game />
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
