import { createAction, props } from "@ngrx/store";
import { Language } from "./language.enum";
import { en } from "./translations/en.translation";

export const SET_LANGUAGE = createAction('[language] Set Language', props<{ language: Language }>());
export const SET_TRANSLATION = createAction('[language] Set Translations', props<{ translation: typeof en }>());