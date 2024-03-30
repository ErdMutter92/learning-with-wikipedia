import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Article } from "./article.model";

export const ARTICLE_FEATURE = 'article';

export const article = createFeatureSelector<Article>(ARTICLE_FEATURE);

export const articleTitle = createSelector(article, (state: Article) => state.title);
export const articleDescription = createSelector(article, (state: Article) => state.description);
export const articleContent = createSelector(article, (state: Article) => state.splitContent);
export const guesses = createSelector(article, (state: Article) => state.guesses);

export const loading = createSelector(article, (state: Article) => state.loading);