import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { WikipediaAPIService } from "../wikipedia.service";
import { ARTICLE_LOADED, LOAD_ARTICLE, SELECT_ARTICLE } from "./article.actions";
import { Store, select } from "@ngrx/store";
import { Library } from "./article.model";

@Injectable()
export class ArticleEffects {
    public readonly loadArticle$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLE),
        withLatestFrom(this.store),
        switchMap(([_, state]) => this.wikipediaApi.getArticle('Wikipedia').pipe(
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
                SELECT_ARTICLE({ id: response?.pageid, }),
            ]),
        )),
    ));

    constructor(
        private actions$: Actions,
        private readonly store: Store<Library>,
        private readonly wikipediaApi: WikipediaAPIService,
    ) { }
}