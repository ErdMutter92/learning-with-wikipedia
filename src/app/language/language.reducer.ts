import { createReducer, on } from "@ngrx/store";
import { LanguageSettings } from "./language.model";
import { Language } from "./language.enum";
import { SET_LANGUAGE, SET_TRANSLATION } from "./language.actions";
import { de as translation } from './translations/de.translation';

export const languageReducer = createReducer<LanguageSettings>(
    { language: Language.deutsch, translation },
    on(SET_LANGUAGE, (state, {language}) => ({ ...state, language: language })),
    on(SET_TRANSLATION, (state, {translation}) => ({ ...state, translation })),
)