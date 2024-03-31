import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { WikipediaAPIService } from "../../common/wikipedia/wikipedia.service";
import { ARTICLE_LOADED, LOAD_ARTICLE, SELECT_ARTICLE } from "./article.actions";
import { Store, select } from "@ngrx/store";
import { Library } from "./article.model";
import { library } from "./article.selectors";

@Injectable()
export class ArticleEffects {
    public readonly loadArticle$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLE),
        withLatestFrom(this.store.pipe(select(library))),
        switchMap(([{ title }, state]) => this.wikipediaApi.getArticle(title).pipe(
            switchMap((response: any) => [
                ...(!state.articles?.[response?.pageid] ? [ARTICLE_LOADED({
                    article: {
                        id: response?.pageid,
                        lang: response?.lang,
                        title: response?.titles?.normalized,
                        content: response?.extract,
                        description: response?.description,
                    }
                })] : []),
                SELECT_ARTICLE({ id: state.selected ?? response.pageid, })
            ]),
        )),
    ));

    constructor(
        private actions$: Actions,
        private readonly store: Store<Library>,
        private readonly wikipediaApi: WikipediaAPIService,
    ) { }
}