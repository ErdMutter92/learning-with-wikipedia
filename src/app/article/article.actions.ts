import { createAction, props } from "@ngrx/store";

export const ADD_GUESS = createAction('[Article] Guess Word', props<{ guess: string }>());
export const CLEAR_GUESSES = createAction('[Article] Clear Guesses');

export const LOAD_ARTICLE = createAction('[Article] Load Article');
export const ARTICLE_LOADED = createAction('[Article] Article Loaded', props<{ title: string; description: string; content: string }>());