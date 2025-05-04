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
    // Add registration period at the beginning
    roundDurations.push(-1); // Placeholder for registration period

    for (let i = 0; i < eliminationTimestamps.length - 1; i++) {
      const duration = eliminationTimestamps[i + 1] - eliminationTimestamps[i];
      roundDurations.push(duration * 1000); // Convert to milliseconds
    }
  }

  // Format time for round duration tooltip
  const formatDuration = (milliseconds: number): string => {
    if (milliseconds === -1) {
      return 'Registration';
    }
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

            {/* Round Progress Bar */}
            {eliminationTimestamps.length > 1 && (
              <div className={classes.roundProgressContainer}>
                <h4>Rounds</h4>
                <div className={classes.roundProgressBar}>
                  {roundDurations.map((duration, index) => {
                    let isCurrentRound = false;
                    let isPastRound = false;

                    if (duration === -1) {
                      // Registration period (first segment)
                      isCurrentRound = !gameHasStarted;
                      isPastRound = gameHasStarted; // Registration period is not past
                    } else {
                      isCurrentRound =
                        index === upcomingEliminationTimestampIndex;
                      isPastRound = index < upcomingEliminationTimestampIndex;
                    }

                    const roundClassName = isCurrentRound
                      ? classes.currentRound
                      : isPastRound
                      ? classes.pastRound
                      : classes.futureRound;

                    return (
                      <div
                        key={index}
                        className={`${classes.roundSegment} ${roundClassName}`}
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
          </div>
        </>
      )}
    </div>
  );
}

export default GamePart;
