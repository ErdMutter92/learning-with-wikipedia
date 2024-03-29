import { createAction, props } from "@ngrx/store";
import { Language } from "./language.enum";

export const SET_LANGUAGE = createAction('[language] Set Language', props<{ langauge: Language }>());