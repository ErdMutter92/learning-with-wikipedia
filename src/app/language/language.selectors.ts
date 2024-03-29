import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LanguageSettings } from "./language.model";

export const language = createFeatureSelector<LanguageSettings>('language');

export const selectedLanguage = createSelector(language, (languageSettings: LanguageSettings) => languageSettings.language);