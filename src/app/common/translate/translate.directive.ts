import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { LanguageSettings } from "../../state/language/language.model";
import { translation } from "../../state/language/language.selectors";

@Directive({
    standalone: true,
    selector: '[translate]'
})
export class TranslateDirective {
    private readonly destroy$ = new Subject();
    @Input() translate!: string;

    constructor(
        private readonly languageSettingsStore: Store<LanguageSettings>,
        private readonly _element: ElementRef,
        private readonly cdr: ChangeDetectorRef,
        private readonly renderer: Renderer2,
    ) {}

    public ngAfterViewInit(): void {
        this.languageSettingsStore.pipe(
            select(translation),
            takeUntil(this.destroy$),
        ).subscribe((translations: any) => {
            this._element.nativeElement.innerHTML = this.translate
                .split('.')
                .reduce((obj, key) => obj[key], translations);

            this.cdr.detectChanges();
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(void 0);
        this.destroy$.complete();
    }
}