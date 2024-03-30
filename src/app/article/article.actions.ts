import { createAction, createReducerFactory, props } from "@ngrx/store";

export const ADD_GUESS = createAction('[Article] Guess Word', props<{ id: string; guess: string; }>());
export const CLEAR_GUESSES = createAction('[Article] Clear Guesses', props<{ id: string; }>());

export const LOAD_ARTICLE = createAction('[Article] Load Article', props<{ title: string }>());
export const SELECT_ARTICLE = createAction('[Article] Select', props<{ id: string }>());

export const ADD_ARTICLE = createAction('[Article] Add Article', props<{ title: string }>());
export const TOGGLE_ARTICLE_MASK = createAction('[Article] Toggle Masks', props<{ id: string }>());
export const ARTICLE_UNMASK = createAction('[Article] Remove Masks', props<{ id: string }>());
export const RESET_ARTICLE = createAction('[Article] Reset', props<{ id: string }>());

export const ARTICLE_LOADED = createAction('[Article] Article Loaded', props<{
    article: {
        id: string;
        title: string;
        lang: string;
        description: string;
        content: string;
    }
}>());