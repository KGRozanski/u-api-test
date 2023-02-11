import { createReducer, on } from '@ngrx/store';
import { ACCOUNT_ACTIONS } from '../actions/account.actions';
import { getAccountInitial } from '../state/initials/account.initial';

export const accountReducer = createReducer(
    getAccountInitial(),
    on(ACCOUNT_ACTIONS.login, (state) => {
        return state;
    }),
    on(ACCOUNT_ACTIONS.update, (state, { AccountInfo }) => ({
        ...state,
        ...AccountInfo
    })),
    on(ACCOUNT_ACTIONS.clearAccountData, () => getAccountInitial())
);
