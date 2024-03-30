import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Article, Library } from "./article.model";

export const ARTICLE_FEATURE = 'article';

export const library = createFeatureSelector<Library>(ARTICLE_FEATURE);

export const selectedId = createSelector(library, (state: Library) => state.selected as string);

export const article = createSelector(library, selectedId, (library: Library, id: string) => {
    return library.articles[id];
});

export const articleTitle = createSelector(article, (state: Article) => state?.title);
export const articleDescription = createSelector(article, (state: Article) => state?.description);
export const articleContent = createSelector(article, (state: Article) => state?.splitContent);
export const guesses = createSelector(article, (state: Article) => state?.guesses);

export const loading = createSelector(library, (state: Library) => state.loading);

export const articleList = createSelector(library, (library: Library) => {
    return Object.values(library.articles).map(article => {
        return [article.id, article.title];
    });
});