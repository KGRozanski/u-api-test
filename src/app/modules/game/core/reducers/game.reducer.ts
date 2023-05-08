import { createFeature, createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import { initialState } from '../state/game.state';

export const gameFeatureKey = 'game';




export const gameReducer = createReducer(
  initialState,
  on(GameActions.gameGames, state => state),
  on(GameActions.gameGamesSuccess, (state, action) => state),
  on(GameActions.gameGamesFailure, (state, action) => state),
  on(GameActions.gameInit, (state, { data }) => ({...state, playerData: data.playerData, entities: data.entities})),
  on(GameActions.gameChatNewMsg, (state, { msg }) => {
    return {
      ...state, 
      chat: {
        messages: [...state.chat.messages, msg],
      }}
  }),
  on(GameActions.gameStateSnapshot, (state, {data}) => ({...state, }))
);

export const gameFeature = createFeature({
  name: gameFeatureKey,
  reducer: gameReducer,
});

