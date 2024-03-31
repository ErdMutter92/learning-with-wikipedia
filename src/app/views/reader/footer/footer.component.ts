import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { CounterComponent } from "../../../components/counter/counter.component";
import { Store, select } from "@ngrx/store";
import { Article } from "../../../state/library/article.model";
import { article, guesses, words } from "../../../state/library/article.selectors";

@Component({
    standalone: true,
    selector: 'reader-footer',
    imports: [
        CommonModule,
        MatDividerModule,
        CounterComponent,
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class ReaderFooterComponent {
    public readonly guesses$ = this.articleStore.pipe(select(guesses));
    public readonly words$ = this.articleStore.pipe(select(words));

    constructor(
        private readonly articleStore: Store<Article>,
    ) {}
}