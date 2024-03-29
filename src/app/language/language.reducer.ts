import { createReducer, on } from "@ngrx/store";
import { LanguageSettings } from "./language.model";
import { Language } from "./language.enum";
import { SET_LANGUAGE } from "./language.actions";

export const languageReducer = createReducer<LanguageSettings>(
    { language: Language.deutsch },
    on(SET_LANGUAGE, (state, action) => ({ ...state, language: action.langauge })),
)