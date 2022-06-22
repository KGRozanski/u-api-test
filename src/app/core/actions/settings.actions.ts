import { createAction, props } from "@ngrx/store";


const darkModeToggle = createAction(
    '[Settings] DarkMode Toggle',
    props<{isDarkModeEnabled: boolean}>()
);


export const SettingsActions = {
    darkModeToggle
};
