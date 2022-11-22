import { createAction, props } from "@ngrx/store";


const darkModeToggle = createAction(
    '[Settings] DarkMode Toggle',
    props<{darkMode: boolean}>()
);

const loaderToggle = createAction(
    '[Settings] Loader Toggle',
    props<{loaderVisibility: boolean}>()
);

const drawerVisibility = createAction(
    '[Settings] Drawer Visibility Toggle',
    props<{drawerVisibility: boolean}>()
);


export const SettingsActions = {
    darkModeToggle, loaderToggle, drawerVisibility
};
