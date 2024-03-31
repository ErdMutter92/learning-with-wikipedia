import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { SET_LANGUAGE, SET_TRANSLATION } from "./language.actions";

import './translations/de.translation';
import './translations/en.translation';

@Injectable()
export class LanguageEffects {
    public readonly loadArticle$ = createEffect(() => this.actions$.pipe(
        ofType(SET_LANGUAGE),
        switchMap(({ language }: any) => import(`./translations/${language}.translation.ts`).then(m => m[language])),
        map(translation => SET_TRANSLATION({ translation })),
    ));

    constructor(
        private actions$: Actions,
    ) { }
}