import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions/account.actions';
import { getAccountInitial } from '../state/initials/account.initial';


export const accountReducer = createReducer(
    getAccountInitial(),
    on(AccountActions.login, (state) => {return state}),
    on(AccountActions.loginSuccess, (state, payload) => payload.userInfo),
    on(AccountActions.clearAccountData, () => getAccountInitial())
);
