import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { LanguageSettings } from "../../state/language/language.model";
import { selectedLanguage } from "../../state/language/language.selectors";
import { switchMap } from "rxjs";
import { Language } from "../../state/language/language.enum";

@Injectable()
export class WikipediaAPIService {
    private readonly language$ = this.languageSettingsStore.pipe(select(selectedLanguage));

    constructor(
        private readonly httpClient: HttpClient,
        private readonly languageSettingsStore: Store<LanguageSettings>,
    ) {}

    public getRandomArticle() {
        // page/random/summary

        const headers = new HttpHeaders();
        // headers.set('Authorization', 'Bearer YOUR_ACCESS_TOKEN');
        headers.set('Api-User-Agent', 'Deutsch Vocab Lehnen (bmbleau@gmail.com)');

        let cors = '';

        if (window.location.hostname !== 'localhost') {
            cors = '?origin=*';
        }

        return this.language$.pipe(
            switchMap((language: Language) => {
                return this.httpClient.get(
                    `https://api.wikimedia.org/feed/v1/wikipedia/${language}/random/summary${cors}`,
                    {
                        headers,
                        withCredentials: false
                    }
                );
            })
        )
    }

    public getArticle(string: string) {
        const headers = new HttpHeaders();
        // headers.set('Authorization', 'Bearer YOUR_ACCESS_TOKEN');
        headers.set('Api-User-Agent', 'Deutsch Vocab Lehnen (bmbleau@gmail.com)');

        let cors = '';

        if (window.location.hostname !== 'localhost') {
            cors = '?origin=*';
        }

        return this.language$.pipe(
            switchMap((language: Language) => {
                return this.httpClient.get(
                    `https://${language}.wikipedia.org/api/rest_v1/page/summary/${string}${cors}`,
                    {
                        headers,
                        withCredentials: false
                    }
                );
            })
        )
    }

    public getFeaturedArticle() {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2,'0');
        let day = String(today.getDate()).padStart(2,'0');

        const headers = new HttpHeaders();
        // headers.set('Authorization', 'Bearer YOUR_ACCESS_TOKEN');
        headers.set('Api-User-Agent', 'Deutsch Vocab Lehnen (bmbleau@gmail.com)');

        let cors = '';

        if (window.location.hostname !== 'localhost') {
            cors = '?origin=*';
        }

        return this.language$.pipe(
            switchMap((language: Language) => {
                return this.httpClient.get(
                    `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}${cors}`,
                    {
                        headers,
                        withCredentials: false
                    }
                );
            })
        )
    }
}