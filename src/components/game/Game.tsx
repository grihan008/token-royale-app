import { useEffect, useState } from 'react';
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

function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null);
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

  const joinTheGame = async () => {
    if (!walletAddress || !gameState) return;
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const sender = new TonConnectProvider(tonConnectUI);

    const result = await tokenRoyaleInstance.send(
      sender,
      {
        value: gameState.entryFee,
      },
      {
        $$type: 'Join',
      }
    );

    console.log('Transaction result:', result);
  };

  const checkIn = async () => {
    if (!walletAddress || !gameState) return;
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const sender = new TonConnectProvider(tonConnectUI);

    const result = await tokenRoyaleInstance.send(
      sender,
      {
        value: toNano('0.1'),
      },
      {
        $$type: 'CheckIn',
      }
    );

    console.log('Transaction result:', result);
  };

  useEffect(() => {
    if (!walletAddress) return;
    getGameState();

    const interval = setInterval(() => {
      getGameState();
    }, 10_000); // Fetch game state every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [walletAddress]);

  const upcomingEliminationTimestamp = Number(
    gameState?.upcomingEliminationTimestamp
  );

  useEffect(() => {
    if (upcomingEliminationTimestamp) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = upcomingEliminationTimestamp * 1000 - currentTime;
        setTimeToElimination(timeLeft);
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [upcomingEliminationTimestamp]);

  if (!walletAddress || !gameState) {
    return (
      <div className={classes.container}>
        <h2>Please connect your wallet</h2>
      </div>
    );
  }

  console.log('Game state:', gameState);

  const isGameUpcoming = gameState.upcomingEliminationTimestamp !== null;

  if (!isGameUpcoming) {
    return (
      <div className={classes.container}>
        <h2>There is no game planned yet</h2>
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

  if (gameHasEnded) {
    return (
      <div className={classes.container}>
        <h2>The game has ended</h2>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1>Game</h1>
      {timeToElimination !== null && (
        <>
          <div className={classes.countdown}>
            {gameHasStarted ? (
              <h2>Time to elimination:</h2>
            ) : (
              <h2>Time to game start:</h2>
            )}
            <p>{new Date(timeToElimination).toISOString().substr(11, 8)}</p>
          </div>

          <button className={classes.button} onClick={joinTheGame}>
            JOIN
          </button>

          <button className={classes.button} onClick={checkIn}>
            CHECKIN
          </button>
        </>
      )}
    </div>
  );
}

export default Game;
