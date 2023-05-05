import { createFeatureSelector } from '@ngrx/store';
import { Settings } from '../interfaces/store/settings.interface';

export const selectSettingsCollection = createFeatureSelector<Settings>('settings');

export const SETTINGS_SELECTORS = {
	selectSettingsCollection,
};
