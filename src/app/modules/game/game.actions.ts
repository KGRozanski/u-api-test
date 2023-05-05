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

export const gamePlayerJoined = createAction(
  '[Game] Player joined',
  props<{ data: any }>()
)

export const gamePlayerLoggedOut = createAction(
  '[Game] Player has logged out',
  props<{ data: any }>()
)