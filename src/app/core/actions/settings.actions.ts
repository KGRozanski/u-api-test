import { createAction, props } from "@ngrx/store";


const darkModeToggle = createAction(
    '[Settings] DarkMode Toggle',
    props<{darkMode: boolean}>()
);

const loaderToggle = createAction(
    '[Settings] Loader Toggle',
    props<{loaderVisibility: boolean}>()
);

const mainMenuToggle = createAction(
    '[Settings] Main menu Toggle'
);

export const SettingsActions = {
    darkModeToggle, loaderToggle, mainMenuToggle
};
