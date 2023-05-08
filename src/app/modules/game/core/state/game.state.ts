import { GameState } from "../interfaces/GameState.interface";

export const initialState: GameState = {
    playerData: null,
    entities: [],
    chat: {
        messages: []
    },
    stateSnapshot: null
};
