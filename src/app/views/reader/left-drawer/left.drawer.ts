import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { WordbankComponent } from "../../../components/wordbank/wordbank.component";
import { Article } from "../../../state/library/article.model";
import { Store, select } from "@ngrx/store";
import { allArticles, guesses, selectedId } from "../../../state/library/article.selectors";
import { ArticleSelectorComponent } from "../../../components/article-selecter/article-selecter.component";
import { LOAD_ARTICLE, SELECT_ARTICLE } from "../../../state/library/article.actions";

@Component({
    standalone: true,
    imports: [CommonModule, ArticleSelectorComponent],
    templateUrl: './left.drawer.html',
    styleUrls: ['./left.drawer.scss']
})
export class LeftReaderDrawer {
    public readonly articles$ = this.articleStore.pipe(select(allArticles));
    public readonly articleId$ = this.articleStore.pipe(select(selectedId));

    constructor(
        private readonly articleStore: Store<Article>,
    ) { }

    public selectArticle(id: any) {
        this.articleStore.dispatch(SELECT_ARTICLE({ id }));
    }

    public addArticle({ title }: any) {
        if (title) {
            this.articleStore.dispatch(LOAD_ARTICLE({ title }));
        }
    }
}