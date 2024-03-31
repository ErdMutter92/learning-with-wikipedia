import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LanguageSettings } from "./language.model";

export const LANGUAGE_FEATURE = 'language';

export const language = createFeatureSelector<LanguageSettings>(LANGUAGE_FEATURE);

export const selectedLanguage = createSelector(language, (languageSettings: LanguageSettings) => languageSettings.language);
export const translation = createSelector(language, (languageSettings: LanguageSettings) => languageSettings.translation);