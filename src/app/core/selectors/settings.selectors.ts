import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Settings } from "../interfaces/settings.interface";


export const selectSettingsCollection = createFeatureSelector<
    Settings
>('settings');



export const SETTINGS_SELECTORS = {
    selectSettingsCollection
}