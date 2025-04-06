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
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const getGameState = async () => {
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const gameState = await tokenRoyaleInstance.getGameState(
      Address.parse(walletAddress)
    );
    setGameState(gameState);
  };

  const joinTheGame = async () => {
    const tokenRoyaleInstance = await getTokenRoyaleInstance();
    const sender = new TonConnectProvider(tonConnectUI);

    await tokenRoyaleInstance.send(
      sender,
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'Join',
      }
    );
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

  const isGameUpcoming = gameState.upcomingEliminationTimestamp !== null;

  if (!isGameUpcoming) {
    return (
      <div className={classes.container}>
        <h2>There is no game planned yet</h2>
      </div>
    );
  }

  let gameHasStarted = false;

  if (
    upcomingEliminationTimestamp !== null &&
    Date.now() > upcomingEliminationTimestamp
  ) {
    gameHasStarted = true;
  }

  return (
    <div className={classes.container}>
      <h1>Game</h1>
      {timeToElimination !== null && (
        <>
          <div className={classes.countdown}>
            {gameHasStarted ? (
              <h2>Time to game start:</h2>
            ) : (
              <h2>Time to elimination:</h2>
            )}
            <p>{new Date(timeToElimination).toISOString().substr(11, 8)}</p>
          </div>

          <button className={classes.button} onClick={joinTheGame}>
            JOIN
          </button>
        </>
      )}
    </div>
  );
}

export default Game;
