import { PlayerState } from '@fadein/commons';
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



export const gameInit = createAction(
  '[Game] Game Init',
  props<{ data: PlayerState }>()
)

export const gamePlayerJoined = createAction(
  '[Game] Player joined',
  props<{ data: any }>()
)

export const gamePlayerLoggedOut = createAction(
  '[Game] Player has logged out',
  props<{ data: any }>()
)

export const gameChatNewMsg = createAction(
  '[Game] Chat: New message',
  props<{ msg: string }>()
)