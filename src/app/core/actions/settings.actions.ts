import { createAction, props } from "@ngrx/store";


const darkModeToggle = createAction(
    '[Settings] DarkMode Toggle',
    props<{darkMode: boolean}>()
);

const loaderToggle = createAction(
    '[Settings] Loader Toggle',
    props<{loaderVisibility: boolean}>()
);


export const SettingsActions = {
    darkModeToggle, loaderToggle
};
