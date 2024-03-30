import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Article, Library } from "./article.model";
import { selectedLanguage } from "../language/language.selectors";

export const ARTICLE_FEATURE = 'library';

export const library = createFeatureSelector<Library>(ARTICLE_FEATURE);

export const selectedId = createSelector(library, (state: Library) => state.selected as string);

export const article = createSelector(library, selectedId, (library: Library, id: string) => {
    return library.articles[id];
});

export const articleTitle = createSelector(article, (state: Article) => state?.title);
export const articleDescription = createSelector(article, (state: Article) => state?.description);
export const articleContent = createSelector(article, (state: Article) => state?.splitContent);
export const guesses = createSelector(article, (state: Article) => state?.guesses);

export const articleUnmasked = createSelector(article, (state: Article) => state?.unmasked);

export const loading = createSelector(library, (state: Library) => state.loading);

export const articleList = createSelector(library, selectedLanguage, (library: Library, selectedLanguage: string) => {
    return Object.values(library.articles).filter(article => {
        return article.lang === selectedLanguage;
    }).map(article => {
        return [article.id, article.title];
    });
});