import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from '../reducers/game.reducer';

export const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);
