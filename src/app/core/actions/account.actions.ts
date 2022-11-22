import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { AccountInfo } from "../interfaces/store/account-info.interface";

const login = createAction(
    '[Account] Login',
    props<{credentials: UserCredentials}>()
);

const update = createAction(
    '[Account] Update',
    props<{AccountInfo: AccountInfo}>()
);

const clearAccountData = createAction(
    '[Account] Clear Account Data'
)

export const ACCOUNT_ACTIONS = {
    login, update, clearAccountData
};
