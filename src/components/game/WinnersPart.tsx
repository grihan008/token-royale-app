import { Winners } from './types.ts';
import classes from './WinnersPart.module.css';
import { useTranslation } from '../../utils/useTranslation';

interface WinnersPartProps {
  gameWinners: Winners | null;
  gameHasEnded: boolean;
}

function formatAddress(address: string): string {
  if (!address || address.length <= 8) {
    return address;
  }
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
}

function WinnersPart({ gameWinners, gameHasEnded }: WinnersPartProps) {
  const { t } = useTranslation();

  if (!gameWinners || gameWinners.lastGameWinners.size === 0) {
    return null;
  }

  return (
    <div className={classes.winnersWrapper}>
      <div className={classes.container}>
        <h1>{t('winners.title')}</h1>
        <h2 className={classes.winnersTableTitle}>
          {t('winners.previousGame')}
        </h2>
        {!gameHasEnded && (
          <div className={classes.winnersTable}>
            <div className={classes.winnersTableHeader}>
              <div className={classes.winnersTableCell}>
                {t('winners.address')}
              </div>
              <div className={classes.winnersTableCell}>
                {t('winners.winnings')}
              </div>
            </div>
            {gameWinners.lastGameWinners.keys().map((address, index) => (
              <div key={index} className={classes.winnersTableRow}>
                <div
                  className={`${classes.winnersTableCell} ${classes.addressCell}`}
                >
                  {formatAddress(address.toString())}
                </div>
                <div className={classes.winnersTableCell}>
                  {(
                    (Number(gameWinners.lastGameWinners.get(address)) ?? 0) /
                    1_000_000_000
                  ).toFixed(2)}
                  &nbsp;TON
                </div>
              </div>
            ))}
          </div>
        )}
        <h2 className={classes.winnersTableTitle}>{t('winners.allTime')}</h2>
        <div className={classes.winnersTable}>
          <div className={classes.winnersTableHeader}>
            <div className={classes.winnersTableCell}>
              {t('winners.address')}
            </div>
            <div className={classes.winnersTableCell}>{t('winners.wins')}</div>
            <div className={classes.winnersTableCell}>
              {t('winners.winnings')}
            </div>
          </div>
          {gameWinners.allTimeWinners.keys().map((address, index) => (
            <div key={index} className={classes.winnersTableRow}>
              <div
                className={`${classes.winnersTableCell} ${classes.addressCell}`}
              >
                {formatAddress(address.toString())}
              </div>
              <div className={classes.winnersTableCell}>
                {gameWinners.allTimeWinners.get(address)?.count.toString()}
              </div>
              <div className={classes.winnersTableCell}>
                {(
                  (Number(
                    gameWinners.allTimeWinners.get(address)?.totalAmount
                  ) ?? 0) / 1_000_000_000
                ).toFixed(2)}
                &nbsp;TON
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WinnersPart;
