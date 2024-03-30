import { createReducer, on } from "@ngrx/store";
import { Article, Library } from "./article.model";
import { ADD_GUESS, ARTICLE_LOADED, ARTICLE_UNMASK, CLEAR_GUESSES, LOAD_ARTICLE, RESET_ARTICLE, SELECT_ARTICLE, TOGGLE_ARTICLE_MASK } from "./article.actions";
import { SPECALS } from "./specals.const";

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
    on(TOGGLE_ARTICLE_MASK, (state, { id }) => ({ ...state, articles: { ...state.articles, [id]: { ...state.articles[id], unmasked: !state.articles[id]?.unmasked } } })),
    on(SELECT_ARTICLE, (state, { id: selected }) => ({ ...state, selected, loading: false })),
    on(ARTICLE_UNMASK, (state, { id }) => ({
        ...state,
        loading: false,
        articles: {
            ...state.articles,
            ...(state.articles?.[id] ? { [id]: { ...state.articles?.[id], unmasked: true } } : {} as any),
        }
    })),
    on(RESET_ARTICLE, (state, { id }) => ({
        ...state,
        loading: false,
        articles: {
            ...state.articles,
            ...(state.articles?.[id] ? {
                [id]: {
                    ...state.articles?.[id], unmasked: false, guesses: [...splitter(state.articles?.[id]?.title ?? '')], 
                }
            } : {} as any),
        }
    })),
    on(ARTICLE_LOADED, (state, { article }) => ({
        ...state,
        loading: false,
        articles: {
            ...state.articles,
            [article.id]: {
                ...state.articles?.[article.id] ?? {},
                ...article,
                splitContent: splitter(article.content),
                guesses: Array.from(new Set([
                    ...splitter(article.title),
                    ...(state.articles?.[article.id]?.guesses ?? [])
                ])),
            },
        } as any,
    })),
)

function splitter(sentence: string): string[] {
    return SPECALS
        .reduce((sentence, specal) => sentence?.split(specal).join(" " + specal + " "), sentence)
        ?.split(" ")
        ?.filter((word) => !!word) ?? [];
}