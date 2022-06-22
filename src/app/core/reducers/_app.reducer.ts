import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { accountReducer } from "./account.reducer";
import { notificationsReducer } from "./notifications.reducer";
import { settingsReducer } from "./settings.reducer";

export const reducers: ActionReducerMap<AppState> = {
    notifications: notificationsReducer,
    account: accountReducer,
    settings: settingsReducer
};
