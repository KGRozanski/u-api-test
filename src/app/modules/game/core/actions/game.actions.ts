import { InitState, PlayerState, PublicState } from '@fadein/commons';
import { createAction, props } from '@ngrx/store';

export const gameGames = createAction(
  '[Game] Game Games'
);

export const gameGamesSuccess = createAction(
  '[Game] Game Games Success',
  props<{ data: any }>()
);

export const gameGamesFailure = createAction(
  '[Game] Game Games Failure',
  props<{ error: any }>()
);


export const gameStateSnapshot = createAction(
  '[Game] Game state snapshot',
  props<{ data: PublicState }>()
)

export const gameInit = createAction(
  '[Game] Game Init',
  props<{ data: InitState }>()
)

export const gamePlayerJoined = createAction(
  '[Game] Player joined',
  props<{ data: PlayerState }>()
)

export const gamePlayerLoggedOut = createAction(
  '[Game] Player has logged out',
  props<{ data: PlayerState }>()
)

export const gameChatNewMsg = createAction(
  '[Game] Chat: New message',
  props<{ msg: string }>()
)