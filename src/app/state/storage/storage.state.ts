import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ARTICLE_FEATURE } from '../library/article.selectors';
import { LANGUAGE_FEATURE } from '../language/language.selectors';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            ARTICLE_FEATURE,
            LANGUAGE_FEATURE
        ],
        rehydrate: true,
    })(reducer);
}