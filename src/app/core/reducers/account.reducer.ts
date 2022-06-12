import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions/account.actions';

export const accountInitialState = {
    username: '–',
    email: '–'
}

export const accountReducer = createReducer(
    accountInitialState,
    on(AccountActions.login, (state) => {return state}),
);
