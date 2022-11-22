import { Settings } from "../../interfaces/store/settings.interface";

export function getSettingsInitial(): Settings {
    return {
        darkMode: true,
        loaderVisibility: false,
        drawerVisibility: false
    }
}
