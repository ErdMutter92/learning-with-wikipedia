import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { WordbankComponent } from "../../../components/wordbank/wordbank.component";
import { Article } from "../../../state/library/article.model";
import { Store, select } from "@ngrx/store";
import { guesses } from "../../../state/library/article.selectors";

@Component({
    standalone: true,
    imports: [CommonModule, WordbankComponent],
    templateUrl: './guess.drawer.html',
    styleUrls: ['./guess.drawer.scss']
})
export class GuessDrawer {
    public readonly guesses$ = this.articleStore.pipe(select(guesses));

    constructor(
        private readonly articleStore: Store<Article>,
    ) {}
}