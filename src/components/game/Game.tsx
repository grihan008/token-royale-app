import { useEffect, useRef, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/ton';
import {
  getTokenRoyaleInstance,
  TonConnectProvider,
} from '../../utils/contractUtils';

import classes from './Game.module.css';

type GameState = Awaited<
  ReturnType<Awaited<ReturnType<typeof getTokenRoyaleInstance>>['getGameState']>
>;
type Winners = Awaited<
  ReturnType<Awaited<ReturnType<typeof getTokenRoyaleInstance>>['getWinners']>
>;

function Game() {
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameWinners, setGameWinners] = useState<Winners | null>(null);
  const [timeToElimination, setTimeToElimination] = useState<number | null>(
    null
  );

  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const getGameState = async () => {
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const gameState = await tokenRoyaleInstance.getGameState(
      Address.parse(walletAddress)
    );
    const blockchainTime = await gameState.blockchainTime;
    const currentTime = Math.floor(Date.now() / 1000);
    const offset = currentTime - Number(blockchainTime);
    setTimeOffset(0);
    setGameState(gameState);
  };

  const getWinners = async () => {
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const winners = await tokenRoyaleInstance.getWinners();
    setGameWinners(winners);
  };

  const joinTheGame = async () => {
    if (!walletAddress || !gameState) return;
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const sender = new TonConnectProvider(tonConnectUI);

    await tokenRoyaleInstance.send(
      sender,
      {
        value: gameState.entryFee,
      },
      {
        $$type: 'Join',
      }
    );
  };

  const checkIn = async () => {
    if (!walletAddress || !gameState) return;
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const sender = new TonConnectProvider(tonConnectUI);

    await tokenRoyaleInstance.send(
      sender,
      {
        value: toNano('0.1'),
      },
      {
        $$type: 'CheckIn',
      }
    );
  };

  const upcomingEliminationTimestampRef = useRef<number | undefined>(undefined);

  const upcomingEliminationTimestamp = gameState?.eliminationTimestamps
    .values()
    .find((timestamp) => timestamp > Date.now() / 1000 - timeOffset);

  const start = useRef(Date.now());

  useEffect(() => {
    if (!walletAddress) return;
    start.current = Date.now();
    getGameState();

    const getWinnersTimeout = setTimeout(() => {
      getWinners();
    }, 3000);

    return () => {
      clearTimeout(getWinnersTimeout);
    };
  }, [walletAddress]);

  useEffect(() => {
    upcomingEliminationTimestampRef.current = upcomingEliminationTimestamp;
  }, [upcomingEliminationTimestamp]);

  useEffect(() => {
    if (!walletAddress) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - start.current < 6000) return; // Wait for 6 seconds before starting polling
      if (upcomingEliminationTimestampRef.current) {
        const timeLeft =
          upcomingEliminationTimestampRef.current * 1000 -
          (currentTime - timeOffset * 1000);

        setTimeToElimination(timeLeft > 0 ? timeLeft : 0);

        // Update the game every 5 seconds on /5 + 1 second
        if (Math.floor(currentTime / 1000) % 5 === 1) {
          getGameState();
        }
      } else {
        // Get winners every 60 seconds on /60 + 4 seconds
        if (Math.floor(currentTime / 1000) % 60 === 4) {
          getWinners();
        }
        // Get game state every 60 seconds on /60 + 7 second
        if (Math.floor(currentTime / 1000) % 60 === 7) {
          getGameState();
        }
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    }; // Cleanup interval and timeout on unmount
  }, [walletAddress]);

  if (!walletAddress) {
    return (
      <div className={classes.container}>
        <h1>Please connect your wallet</h1>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className={classes.container}>
        <h1>Loading...</h1>
      </div>
    );
  }

  let gameHasStarted = false;

  const eliminationTimestamps = gameState.eliminationTimestamps.values();

  if (
    eliminationTimestamps.length &&
    Date.now() / 1000 - timeOffset > eliminationTimestamps[0]
  ) {
    gameHasStarted = true;
  }

  let gameHasEnded = false;
  if (
    eliminationTimestamps.length &&
    eliminationTimestamps[eliminationTimestamps.length - 1] <
      Date.now() / 1000 - timeOffset
  ) {
    gameHasEnded = true;
  }

  const getGamePart = () => {
    const isGameUpcoming = gameState.upcomingEliminationTimestamp !== null;

    if (!isGameUpcoming) {
      return (
        <div className={classes.container}>
          <h1>There is no game planned yet</h1>
        </div>
      );
    }

    if (gameHasEnded) {
      return (
        <div className={classes.container}>
          <h1>GAME COMPLETED</h1>
          <h2>The winners will be announced soon!</h2>
        </div>
      );
    }

    let isCheckedIn = false;
    const lastCheckInTime = gameState.lastCheckInTime;
    const upcomingEliminationTimestampIndex = eliminationTimestamps.findIndex(
      (timestamp) => timestamp === upcomingEliminationTimestamp
    );
    if (upcomingEliminationTimestampIndex !== -1 && lastCheckInTime !== null) {
      if (upcomingEliminationTimestampIndex === 0) {
        isCheckedIn = true;
      }
      if (
        lastCheckInTime >
        eliminationTimestamps[upcomingEliminationTimestampIndex - 1]
      ) {
        isCheckedIn = true;
      }
    }

    return (
      <div className={classes.container}>
        {timeToElimination !== null && (
          <>
            <div className={classes.gameInformation}>
              <div className={classes.countdown}>
                {gameHasStarted ? (
                  <>
                    <h2>Elimination in</h2>
                  </>
                ) : (
                  <h2>Game starts in</h2>
                )}
                <h1 className={classes.countdownTime}>
                  {new Date(timeToElimination).toISOString().substr(11, 8)}
                </h1>
              </div>

              {gameHasStarted ? (
                <div className={classes.gameInfo}>
                  <div>
                    <h3>Round</h3>
                    <h2>
                      {upcomingEliminationTimestampIndex} /{' '}
                      {eliminationTimestamps.length - 1}
                    </h2>
                  </div>
                  <div>
                    <h3>Players</h3>
                    <h2>
                      {gameState.amountOfRemainingParticipants} /{' '}
                      {gameState.amountOfParticipants}
                    </h2>
                  </div>
                  <div>
                    <h3>Prize pool</h3>
                    <h2>~{Number(gameState.prizePool).toFixed(2)}&nbsp;TON</h2>
                  </div>
                </div>
              ) : (
                <div className={classes.gameInfo}>
                  <div>
                    <h3>Entry fee</h3>
                    <h2>{Number(gameState.entryFee) / 1_000_000_000} TON</h2>
                  </div>
                  <div>
                    <h3>Prize pool</h3>
                    <h2>~{Number(gameState.prizePool).toFixed(2)}&nbsp;TON</h2>
                  </div>
                  <div>
                    <h3>Players</h3>
                    <h2>{gameState.amountOfParticipants}</h2>
                  </div>
                </div>
              )}
            </div>

            {!lastCheckInTime && !gameHasStarted && (
              <button className={classes.button} onClick={joinTheGame}>
                JOIN
              </button>
            )}

            {lastCheckInTime && !gameHasStarted && (
              <div className={classes.checkInStatus}>
                <h3>YOU HAVE ALREADY REGISTERED</h3>
                <p>Get ready for the game to start</p>
              </div>
            )}

            {gameHasStarted && isCheckedIn && (
              <div className={classes.checkInStatus}>
                <h3>YOU HAVE ALREADY CHECKED IN THIS ROUND</h3>
              </div>
            )}

            {gameHasStarted && !gameState.isStillInGame && (
              <div className={classes.checkInStatus}>
                <h3>YOU HAVE BEEN ELIMINATED</h3>
                <p>Better luck next time</p>
              </div>
            )}

            {gameHasStarted && gameState.isStillInGame && (
              <button className={classes.button} onClick={checkIn}>
                CHECK-IN
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  const getWinnersPart = () => {
    if (!gameWinners || gameWinners.lastGameWinners.size === 0) {
      return null;
    }

    return (
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
    );
  };

  return (
    <>
      {getGamePart()}
      {getWinnersPart()}
    </>
  );
}

export default Game;
