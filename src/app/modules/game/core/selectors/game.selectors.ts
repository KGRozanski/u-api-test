import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from '../reducers/game.reducer';
import { GameState } from '../interfaces/GameState.interface';

export const selectGameState = createFeatureSelector<GameState>(
  fromGame.gameFeatureKey
);

export const selectChatMessages = createSelector(
  selectGameState,
  (state: GameState) => state.chat.messages
);

export const selectPlayerData = createSelector(
  selectGameState,
  (state: GameState) => state.playerData
)
