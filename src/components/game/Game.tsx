import { useEffect, useRef, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/ton';
import {
  getTokenRoyaleInstance,
  TonConnectProvider,
} from '../../utils/contractUtils';
import { useTranslation } from '../../utils/useTranslation';

import GamePart from './GamePart';
import WinnersPart from './WinnersPart';
import { GameState, Winners } from './types';

import classes from './Game.module.css';

function Game() {
  const { t } = useTranslation();
  const [timeOffset, setTimeOffset] = useState<number>(7_000);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameWinners, setGameWinners] = useState<Winners | null>(null);
  const [timeToElimination, setTimeToElimination] = useState<number | null>(
    null
  );

  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const getTimeOffset = async () => {
    fetch(import.meta.env.VITE_TIMESTAMP_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const serverTime = data.timestamp;
        const localTime = Date.now();
        setTimeOffset(localTime - serverTime + 7_000);
      })
      .catch((error) => {
        console.error('Error fetching time offset:', error);
      });
  };

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

  const upcomingEliminationTimestampRef = useRef<number | undefined>(undefined);
  const timeOffsetRef = useRef<number>(0);

  const upcomingEliminationTimestamp = gameState?.eliminationTimestamps
    .values()
    .find((timestamp) => timestamp > (Date.now() - timeOffset) / 1000);

  const start = useRef(Date.now());

  useEffect(() => {
    getTimeOffset();

    const interval = setInterval(() => {
      getTimeOffset();
    }, 5 * 60_000); // Update every 5 minutes

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    timeOffsetRef.current = timeOffset;
  }, [timeOffset]);

  useEffect(() => {
    if (!walletAddress) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - start.current < 6000) return; // Wait for 6 seconds before starting polling
      if (upcomingEliminationTimestampRef.current) {
        const timeLeft =
          upcomingEliminationTimestampRef.current * 1000 -
          (currentTime - timeOffsetRef.current);

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
        <h1>{t('game.connectWallet')}</h1>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className={classes.container}>
        <h1>{t('game.loading')}</h1>
      </div>
    );
  }

  let gameHasStarted = false;

  const eliminationTimestamps = gameState.eliminationTimestamps.values();

  if (
    eliminationTimestamps.length &&
    (Date.now() - timeOffset) / 1000 > eliminationTimestamps[0]
  ) {
    gameHasStarted = true;
  }

  let gameHasEnded = false;
  if (
    eliminationTimestamps.length &&
    eliminationTimestamps[eliminationTimestamps.length - 1] <
      (Date.now() - timeOffset) / 1000
  ) {
    gameHasEnded = true;
  }

  return (
    <>
      <GamePart
        gameState={gameState}
        timeToElimination={timeToElimination}
        gameHasStarted={gameHasStarted}
        gameHasEnded={gameHasEnded}
        eliminationTimestamps={eliminationTimestamps}
        upcomingEliminationTimestamp={upcomingEliminationTimestamp}
        joinTheGame={joinTheGame}
        checkIn={checkIn}
      />
      <WinnersPart gameWinners={gameWinners} gameHasEnded={gameHasEnded} />
    </>
  );
}

export default Game;
