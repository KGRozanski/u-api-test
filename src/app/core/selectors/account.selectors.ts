import { createFeatureSelector } from "@ngrx/store";
import { AccountInfo } from "../interfaces/account-info.interface";


export const selectAccountCollection = createFeatureSelector<
    AccountInfo
>('account');


export const ACCOUNT_SELECTORS = {
    selectAccountCollection
}