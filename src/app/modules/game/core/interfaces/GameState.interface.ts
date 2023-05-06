import { PlayerState } from "@fadein/commons";

export interface GameState {
    initPlayerData: PlayerState | null;
    chat: {
        messages: Array<string>
    }
}
