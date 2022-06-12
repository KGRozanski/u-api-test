import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { Notification } from '../interfaces/notification.interface';

const login = createAction(
    '[Account] Login',
    props<{credentials: UserCredentials}>()
);

const loginSuccess = createAction(
    '[Account] Login Success'
);

export const AccountActions = {
    login, loginSuccess
};
