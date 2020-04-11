export const GAME_STARTED = 'GAME_STARTED';
export const GAME_ROLE_ASSIGNED = 'GAME_ROLE_ASSIGNED';

export enum GameRoles {
  JUDGE,
  PLAYER,
}

interface GameStartedAction {
  type: typeof GAME_STARTED;
  payload: null;
}

interface GameRoleAssignedAction {
  type: typeof GAME_STARTED;
  payload: {
    role: GameRoles;
  };
}

export type GameActionTypes = GameStartedAction | GameRoleAssignedAction;
