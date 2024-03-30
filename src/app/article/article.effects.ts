import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { WikipediaAPIService } from "../wikipedia.service";
import { ARTICLE_LOADED, LOAD_ARTICLE } from "./article.actions";

@Injectable()
export class ArticleEffects {
    public readonly loadArticle$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLE),
        switchMap(() => this.wikipediaApi.getFeaturedArticle().pipe(
            map(({tfa}: any) => tfa),
            map((response: any) => ARTICLE_LOADED({
                title: response?.titles?.normalized,
                content: response?.extract,
                description: response?.description,
            })),
        )),
    ));

    constructor(
        private actions$: Actions,
        private readonly wikipediaApi: WikipediaAPIService,
    ) { }
}