import { createFeature, createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(GameActions.gameGames, state => state),
  on(GameActions.gameGamesSuccess, (state, action) => state),
  on(GameActions.gameGamesFailure, (state, action) => state),
);

export const gameFeature = createFeature({
  name: gameFeatureKey,
  reducer,
});

