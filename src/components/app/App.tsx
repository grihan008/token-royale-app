import classes from './App.module.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from '../game/Game';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://grihan008.github.io/token-royale-app/tonconnect-manifest.json">
      <nav className={classes.navbar}>
        <div className={`${classes.container} ${classes.navbarContainer}`}>
          <img
            src="/favicon.jpg"
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
    </TonConnectUIProvider>
  );
}

export default App;
