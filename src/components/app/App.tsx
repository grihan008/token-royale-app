import classes from './App.module.css';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from '../game/Game';
import tokenRoyaleLogo from '/favicon.png';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../utils/useTranslation';
import { useRef, useEffect } from 'react';

// Info Dialog component
function InfoDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation();

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  // Handle clicks on the backdrop to close the dialog
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Check if the click was on the dialog backdrop (not on dialog content)
    // This works because the dialog element itself serves as the backdrop
    const rect = dialogRef.current?.getBoundingClientRect();
    if (rect) {
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        closeDialog();
      }
    }
  };

  return (
    <>
      <button
        className={classes.infoButton}
        onClick={openDialog}
        title={t('info.button')}
        aria-label={t('info.button')}
      >
        i
      </button>
      <dialog
        ref={dialogRef}
        className={classes.dialog}
        onClick={handleDialogClick}
      >
        <div className={classes.dialogWrapper}>
          <div className={classes.dialogHeader}>
            <h2 className={classes.dialogTitle}>{t('info.title')}</h2>
            <button
              className={classes.dialogClose}
              onClick={closeDialog}
              aria-label={t('info.close')}
            >
              ×
            </button>
          </div>
          <div className={classes.dialogContent}>
            <div className={classes.dialogSection}>
              <p className={classes.dialogText}>{t('info.description')}</p>
            </div>
          </div>
          <div className={classes.dialogFooter}>
            <button className={classes.dialogButton} onClick={closeDialog}>
              {t('info.close')}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

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
              <InfoDialog />
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
