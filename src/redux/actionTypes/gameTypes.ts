export const GAME_STATE_CHANGED = 'GAME_STATE_CHANGED';
export const GAME_ROLE_ASSIGNED = 'GAME_ROLE_ASSIGNED';

export enum GameRoles {
  JUDGE,
  PLAYER,
}

export interface GameStateChangedAction {
  type: typeof GAME_STATE_CHANGED;
  payload: boolean;
}

export interface GameRoleAssignedAction {
  type: typeof GAME_ROLE_ASSIGNED;
  payload: {
    role: GameRoles;
  };
}

export type GameActionTypes = GameStateChangedAction | GameRoleAssignedAction;
