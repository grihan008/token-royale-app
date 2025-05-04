import classes from './App.module.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from '../game/Game';
import tokenRoyaleLogo from '/favicon.png';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

// Language selector component
function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={classes.languageSelector}
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
    >
      <button
        className={`${classes.langButton} ${
          language === 'en' ? classes.active : ''
        }`}
      >
        EN
      </button>
      <button
        className={`${classes.langButton} ${
          language === 'ru' ? classes.active : ''
        }`}
      >
        RU
      </button>
    </div>
  );
}

// Main app content with language selector
function AppContent() {
  const { language } = useLanguage();

  return (
    <TonConnectUIProvider
      manifestUrl="https://grihan008.github.io/token-royale-app/tonconnect-manifest.json"
      language={language}
    >
      <div className={classes.page}>
        <nav className={classes.navbar}>
          <div className={`${classes.container} ${classes.navbarContainer}`}>
            <img
              src={tokenRoyaleLogo}
              alt="Logo"
              className={classes.logo}
              width="40"
            />
            <div className={classes.navbarRight}>
              <LanguageSelector />
              <TonConnectButton />
            </div>
          </div>
        </nav>
        <main className={classes.main}>
          <Game />
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
