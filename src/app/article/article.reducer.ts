import { createReducer, on } from "@ngrx/store";
import { Article } from "./article.model";
import { ADD_GUESS, ARTICLE_LOADED, CLEAR_GUESSES, LOAD_ARTICLE } from "./article.actions";

export const articleReducer = createReducer<Article>(
    { loading: true, guesses: [], content: null, description: null, splitContent: [], title: null },
    on(ADD_GUESS, (state, action) => ({
        ...state,
        guesses: Array.from(new Set(state.guesses).add(action.guess))
    })),
    on(CLEAR_GUESSES, (state) => ({
        ...state,
        guesses: []
    })),
    on(LOAD_ARTICLE, (state) => ({ ...state, loading: true })),
    on(ARTICLE_LOADED, (state, action) => ({
        ...state,
        loading: false,
        title: action.title,
        description: action.description,
        content: action.content,
        splitContent: splitter(action.content),
        guesses: Array.from(new Set([
            ...state.guesses,
            ...splitter(action.title)
        ]))
    })),
)

function splitter(sentence: string): string[] {
    const specals = ['.', ',', ')', '(', '!', '?', '-']

    return specals
        .reduce((sentence, specal) => sentence?.split(specal).join(" " + specal + " "), sentence)
        ?.split(" ")
        ?.filter((word) => !!word) ?? [];
}