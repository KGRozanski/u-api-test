import { createAction, props } from "@ngrx/store";


const darkModeToggle = createAction(
    '[Settings] DarkMode Toggle',
    props<{darkMode: boolean}>()
);


export const SettingsActions = {
    darkModeToggle
};
