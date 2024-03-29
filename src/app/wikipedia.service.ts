import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WikipediaAPIService {
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    public getFeaturedArticle() {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2,'0');
        let day = String(today.getDate()).padStart(2,'0');

        const language = 'de';

        const headers = new HttpHeaders();
        // headers.set('Authorization', 'Bearer YOUR_ACCESS_TOKEN');
        headers.set('Api-User-Agent', 'Deutsch Vocab Lehnen (bmbleau@gmail.com)');

        return this.httpClient.get(`https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}?origin=*`, { headers });
    }
}