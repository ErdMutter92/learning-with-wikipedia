import { createReducer, on } from "@ngrx/store";
import { Article, Library } from "./article.model";
import { ADD_GUESS, ARTICLE_LOADED, CLEAR_GUESSES, LOAD_ARTICLE, SELECT_ARTICLE } from "./article.actions";

export const articleReducer = createReducer<Library>(
    { loading: true, selected: undefined, articles: {} },
    on(ADD_GUESS, (state, { guess, id }) => ({
        ...state,
        articles: {
            ...state.articles,
            [id]: {
                ...state.articles[id],
                guesses: Array.from(new Set(state.articles[id].guesses).add(guess)),
            },
        },
    })),
    on(CLEAR_GUESSES, (state, { id }) => ({
        ...state,
        articles: {
            ...state.articles,
            [id]: {
                ...state.articles[id],
                guesses: [],
            },
        },
    })),
    on(LOAD_ARTICLE, (state) => ({ ...state, loading: true })),
    on(SELECT_ARTICLE, (state, { id: selected }) => ({...state, selected, loading: false })),
    on(ARTICLE_LOADED, (state, { article }) => ({
        ...state,
        loading: false,
        articles: {
            ...state.articles,
            [article.id]: {
                ...article,
                splitContent: splitter(article.content),
                guesses: Array.from([
                    ...splitter(article.title),
                    ...(state.articles?.[article.id]?.guesses ?? [])
                ]),
            },
        } as any,
    })),
)

function splitter(sentence: string): string[] {
    const specals = ['.', ',', ')', '(', '!', '?', '-']

    return specals
        .reduce((sentence, specal) => sentence?.split(specal).join(" " + specal + " "), sentence)
        ?.split(" ")
        ?.filter((word) => !!word) ?? [];
}