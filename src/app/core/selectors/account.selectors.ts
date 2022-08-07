import { createFeatureSelector } from "@ngrx/store";
import { UserInfo } from "../interfaces/user-info.interface";


export const selectAccountCollection = createFeatureSelector<
    UserInfo
>('account');


export const ACCOUNT_SELECTORS = {
    selectAccountCollection
}