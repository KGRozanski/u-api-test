import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '../actions/settings.actions';
import { getSettingsInitial } from '../state/initials/settings.initial';

export const settingsReducer = createReducer(
	getSettingsInitial(),
	on(SettingsActions.darkModeToggle, (state, { darkMode }) => ({
		...state,
		darkMode,
	})),
	on(SettingsActions.loaderToggle, (state, { loaderVisibility }) => ({
		...state,
		loaderVisibility,
	})),
	on(SettingsActions.drawerVisibility, (state, { drawerVisibility }) => ({
		...state,
		drawerVisibility,
	})),
);
