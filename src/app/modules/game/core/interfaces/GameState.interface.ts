import { PlayerState, PublicState } from "@fadein/commons";

export interface GameState {
    playerData: PlayerState | null;
    chat: {
        messages: Array<string>
    },
    stateSnapshot: PublicState | null
}
