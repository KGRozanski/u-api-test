import { GameState } from "../interfaces/GameState.interface";

export const initialState: GameState = {
    playerData: null,
    chat: {
        messages: []
    },
    stateSnapshot: null
};
