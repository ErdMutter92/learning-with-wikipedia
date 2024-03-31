import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Article } from "../../state/library/article.model";
import { article } from "../../state/library/article.selectors";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { ADD_GUESS } from "../../state/library/article.actions";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ArticleMaskDirective } from "../../state/library/article-mask.directive";
import { MatButtonModule } from "@angular/material/button";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        ArticleMaskDirective,
    ],
    templateUrl: './reader.page.html',
    styleUrls: ['./reader.page.scss']
})
export class ReaderPage {
    public readonly article$ = this.articleStore.pipe(select(article));

    public readonly guesser = this.formBuilder.group({
        main: ''
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly articleStore: Store<Article>,
    ) { }

    public registerGuess(articleId?: string): void {
        const { main: guess } = this.guesser.value;

        if (guess && articleId) {
            this.articleStore.dispatch(ADD_GUESS({ id: articleId, guess }));
            this.guesser.reset();
        }
    }

    public reset(articleId?: string): void {}

    public unmask(articleId?: string): void {}

    public preventInput(key: string) {
        return (event: KeyboardEvent) => {
            if (event.key === key) {
                event.stopPropagation();
                return false;
            }

            return true;
        };
    }
}