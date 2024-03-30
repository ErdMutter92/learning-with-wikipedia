import { createAction, props } from "@ngrx/store";

export const ADD_GUESS = createAction('[Article] Guess Word', props<{ id: string; guess: string; }>());
export const CLEAR_GUESSES = createAction('[Article] Clear Guesses');

export const LOAD_ARTICLE = createAction('[Article] Load Article');
export const SELECT_ARTICLE = createAction('[Article] Select', props<{ id: string }>());
export const ARTICLE_LOADED = createAction('[Article] Article Loaded', props<{
    article: {
        id: string;
        title: string;
        description: string;
        content: string;
    }
}>());