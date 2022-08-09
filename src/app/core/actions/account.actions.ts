import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { UserInfo } from "../interfaces/user-info.interface";

const login = createAction(
    '[Account] Login',
    props<{credentials: UserCredentials}>()
);

const loginSuccess = createAction(
    '[Account] Login Success',
    props<{userInfo: UserInfo}>()
);

const clearAccountData = createAction(
    '[Account] Clear Account Data'
)

export const AccountActions = {
    login, loginSuccess, clearAccountData
};
