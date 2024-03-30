import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { WikipediaAPIService } from "../wikipedia.service";
import { ARTICLE_LOADED, LOAD_ARTICLE, SELECT_ARTICLE } from "./article.actions";

@Injectable()
export class ArticleEffects {
    public readonly loadArticle$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLE),
        switchMap(() => this.wikipediaApi.getArticle('Wikipedia').pipe(
            switchMap((response: any) => [
                SELECT_ARTICLE({ id: response?.wikibase_item, }),
                ARTICLE_LOADED({
                    article: {
                        id: response?.wikibase_item,
                        title: response?.titles?.normalized,
                        content: response?.extract,
                        description: response?.description,
                    }
                }),
            ]),
        )),
    ));

    constructor(
        private actions$: Actions,
        private readonly wikipediaApi: WikipediaAPIService,
    ) { }
}