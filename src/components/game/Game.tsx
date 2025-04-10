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

  const upcomingEliminationTimestamp = gameState?.eliminationTimestamps
    .values()
    .find((timestamp) => timestamp > Date.now() / 1000);

  const start = useRef(Date.now());

  useEffect(() => {
    if (!walletAddress) return;
    getGameState();

    const getWinnersTimeout = setTimeout(() => {
      getWinners();
    }, 2500);

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - start.current < 6000) return; // Wait for 6 seconds before starting polling
      if (upcomingEliminationTimestamp) {
        const timeLeft = upcomingEliminationTimestamp * 1000 - currentTime;
        setTimeToElimination(timeLeft > 0 ? timeLeft : 0);

        // Update the game every 5 seconds on /5 + 1 second
        if (Math.floor(currentTime / 1000) % 5 === 1) {
          getGameState();
        }
      } else {
        // Get winners every 60 seconds on /60 + 3.5 second
        if (Math.floor(currentTime / 100) % 600 === 35) {
          getWinners();
        }
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
      clearTimeout(getWinnersTimeout);
    }; // Cleanup interval and timeout on unmount
  }, [walletAddress, upcomingEliminationTimestamp]);

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
    Date.now() / 1000 > eliminationTimestamps[0]
  ) {
    gameHasStarted = true;
  }

  let gameHasEnded = false;
  if (
    eliminationTimestamps.length &&
    eliminationTimestamps[eliminationTimestamps.length - 1] < Date.now() / 1000
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
          <h1>The game has ended</h1>
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
        <h1>Game</h1>
        {timeToElimination !== null && (
          <>
            <div className={classes.countdown}>
              <div>
                {gameHasStarted ? (
                  <>
                    <h2>
                      Round {upcomingEliminationTimestampIndex} /{' '}
                      {eliminationTimestamps.length - 1}
                    </h2>
                    <h2>Elimination in:</h2>
                  </>
                ) : (
                  <h2>Game starts in:</h2>
                )}
                <h3>
                  {new Date(timeToElimination).toISOString().substr(11, 8)}
                </h3>
              </div>
              <div>
                {gameHasStarted && (
                  <>
                    <h2>Remaining players:</h2>
                    <h3>
                      {gameState.amountOfRemainingParticipants} /{' '}
                      {gameState.amountOfParticipants}
                    </h3>
                  </>
                )}
              </div>
            </div>

            {!lastCheckInTime && !gameHasStarted && (
              <button className={classes.button} onClick={joinTheGame}>
                JOIN
              </button>
            )}

            {lastCheckInTime && !gameHasStarted && (
              <>
                <h3>You have already registered</h3>
                <p>Get ready for the game to start</p>
              </>
            )}

            {gameHasStarted && isCheckedIn && (
              <>
                <h3>You have already checked-in this round</h3>
              </>
            )}

            {gameHasStarted && !gameState.isStillInGame && (
              <>
                <h3>You have been eliminated</h3>
                <p>Better luck next time</p>
              </>
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
        <h2>Previous game winners</h2>
        {!gameHasEnded && (
          <div className={classes.winnersTable}>
            <div className={classes.winnersTableHeader}>
              <div className={classes.winnersTableCell}>Address</div>
              <div className={classes.winnersTableCell}>Winnings</div>
            </div>
            {gameWinners.lastGameWinners.keys().map((address, index) => (
              <div key={index} className={classes.winnersTableRow}>
                <div className={classes.winnersTableCell}>
                  {address.toRawString()}
                </div>
                <div className={classes.winnersTableCell}>
                  {gameWinners.lastGameWinners.get(address)?.toString()}
                </div>
              </div>
            ))}
          </div>
        )}
        <h2>All time winners</h2>
        <div className={classes.winnersTable}>
          <div className={classes.winnersTableHeader}>
            <div className={classes.winnersTableCell}>Address</div>
            <div className={classes.winnersTableCell}>Wins</div>
            <div className={classes.winnersTableCell}>Winnings</div>
          </div>
          {gameWinners.allTimeWinners.keys().map((address, index) => (
            <div key={index} className={classes.winnersTableRow}>
              <div className={classes.winnersTableCell}>
                {address.toRawString()}
              </div>
              <div className={classes.winnersTableCell}>
                {gameWinners.allTimeWinners.get(address)?.count.toString()}
              </div>
              <div className={classes.winnersTableCell}>
                {gameWinners.allTimeWinners
                  .get(address)
                  ?.totalAmount.toString()}
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
