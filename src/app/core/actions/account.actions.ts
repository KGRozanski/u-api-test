import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { AccountInfo } from "../interfaces/account-info.interface";

const login = createAction(
    '[Account] Login',
    props<{credentials: UserCredentials}>()
);

const loginSuccess = createAction(
    '[Account] Login Success',
    props<{AccountInfo: AccountInfo}>()
);

const clearAccountData = createAction(
    '[Account] Clear Account Data'
)

export const AccountActions = {
    login, loginSuccess, clearAccountData
};
