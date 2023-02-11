import { Action, ActionReducer } from '@ngrx/store';
import * as HydrationActions from '../actions/hydration.actions';
import { AppState } from '../state/app.state';

function isHydrateSuccess(action: Action): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
    return action.type === HydrationActions.hydrateSuccess.type;
}

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
    return (state, action) => {
        if (isHydrateSuccess(action)) {
            return action.state;
        } else {
            return reducer(state, action);
        }
    };
};
