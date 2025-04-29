import { GameState } from './types.ts';
import classes from './GamePart.module.css';

interface GamePartProps {
  gameState: GameState;
  timeToElimination: number | null;
  gameHasStarted: boolean;
  gameHasEnded: boolean;
  eliminationTimestamps: number[];
  upcomingEliminationTimestamp: number | undefined;
  joinTheGame: () => Promise<void>;
  checkIn: () => Promise<void>;
}

function GamePart({
  gameState,
  timeToElimination,
  gameHasStarted,
  gameHasEnded,
  eliminationTimestamps,
  upcomingEliminationTimestamp,
  joinTheGame,
  checkIn,
}: GamePartProps) {
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

  // Calculate round durations
  const roundDurations: number[] = [];
  if (eliminationTimestamps.length > 1) {
    for (let i = 0; i < eliminationTimestamps.length - 1; i++) {
      const duration = eliminationTimestamps[i + 1] - eliminationTimestamps[i];
      roundDurations.push(duration * 1000); // Convert to milliseconds
    }
  }

  // Format time for round duration tooltip
  const formatDuration = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''} ${
      seconds ? `${seconds}s` : ''
    }`;
  };

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

            {/* Round Progress Bar */}
            {eliminationTimestamps.length > 1 && (
              <div className={classes.roundProgressContainer}>
                <h4>Rounds</h4>
                <div className={classes.roundProgressBar}>
                  {roundDurations.map((duration, index) => {
                    const isCurrentRound =
                      index === upcomingEliminationTimestampIndex - 1;
                    const isPastRound =
                      index < upcomingEliminationTimestampIndex - 1;
                    const roundClassName = isCurrentRound
                      ? classes.currentRound
                      : isPastRound
                      ? classes.pastRound
                      : classes.futureRound;

                    // Width proportional to round duration
                    const width = `${
                      (duration / roundDurations.reduce((a, b) => a + b, 0)) *
                      100
                    }%`;

                    return (
                      <div
                        key={index}
                        className={`${classes.roundSegment} ${roundClassName}`}
                        style={{ width }}
                      >
                        <span className={classes.roundNumber}>
                          {formatDuration(duration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
}

export default GamePart;
