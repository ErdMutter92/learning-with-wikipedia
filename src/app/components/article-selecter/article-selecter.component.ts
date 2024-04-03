import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { Article } from "../../state/library/article.model";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "../../common/translate/translate.pipe";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        TranslatePipe,
    ],
    selector: 'article-selecter',
    templateUrl: './article-selecter.component.html',
    styleUrls: ['./article-selecter.component.scss']
})
export class ArticleSelectorComponent {
    @Input() articles!: Article[] | null;
    @Input() activeId!: string | null;

    @Output()
    public readonly search: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly select: EventEmitter<any> = new EventEmitter();

    public readonly searchForm = this.formBuilder.group({
        title: '',
    });

    constructor(
        private readonly formBuilder: FormBuilder,
    ) {}

    public _submit$$(): void {
        const { title } = this.searchForm.value;

        if (title) {
            this.search.emit({ title });
            this.searchForm.reset();
        }
    }

    public _select$$(article?: Article): void {
        this.select.emit(article);
    }
}