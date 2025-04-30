import { Winners } from './types.ts';
import classes from './WinnersPart.module.css';

interface WinnersPartProps {
  gameWinners: Winners | null;
  gameHasEnded: boolean;
}

function WinnersPart({ gameWinners, gameHasEnded }: WinnersPartProps) {
  if (!gameWinners || gameWinners.lastGameWinners.size === 0) {
    return null;
  }

  return (
    <div className={classes.winnersWrapper}>
      <div className={classes.container}>
        <h1>Winners</h1>
        <h2 className={classes.winnersTableTitle}>Previous game winners</h2>
        {!gameHasEnded && (
          <div className={classes.winnersTable}>
            <div className={classes.winnersTableHeader}>
              <div className={classes.winnersTableCell}>Address</div>
              <div className={classes.winnersTableCell}>Winnings</div>
            </div>
            {gameWinners.lastGameWinners.keys().map((address, index) => (
              <div key={index} className={classes.winnersTableRow}>
                <div
                  className={`${classes.winnersTableCell} ${classes.addressCell}`}
                >
                  {address.toString()}
                </div>
                <div className={classes.winnersTableCell}>
                  {(Number(gameWinners.lastGameWinners.get(address)) ?? 0) /
                    1_000_000_000}
                  &nbsp;TON
                </div>
              </div>
            ))}
          </div>
        )}
        <h2 className={classes.winnersTableTitle}>All time winners</h2>
        <div className={classes.winnersTable}>
          <div className={classes.winnersTableHeader}>
            <div className={classes.winnersTableCell}>Address</div>
            <div className={classes.winnersTableCell}>Wins</div>
            <div className={classes.winnersTableCell}>Winnings</div>
          </div>
          {gameWinners.allTimeWinners.keys().map((address, index) => (
            <div key={index} className={classes.winnersTableRow}>
              <div
                className={`${classes.winnersTableCell} ${classes.addressCell}`}
              >
                {address.toString()}
              </div>
              <div className={classes.winnersTableCell}>
                {gameWinners.allTimeWinners.get(address)?.count.toString()}
              </div>
              <div className={classes.winnersTableCell}>
                {(Number(
                  gameWinners.allTimeWinners.get(address)?.totalAmount
                ) ?? 0) / 1_000_000_000}
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
