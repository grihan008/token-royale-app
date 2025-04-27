import { getTokenRoyaleInstance } from '../../utils/contractUtils';

export type GameState = Awaited<
  ReturnType<Awaited<ReturnType<typeof getTokenRoyaleInstance>>['getGameState']>
>;

export type Winners = Awaited<
  ReturnType<Awaited<ReturnType<typeof getTokenRoyaleInstance>>['getWinners']>
>;
