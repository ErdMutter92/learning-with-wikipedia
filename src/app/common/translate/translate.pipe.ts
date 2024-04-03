import { ChangeDetectorRef, Pipe, PipeTransform } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store, select } from "@ngrx/store";
import { translation } from "../../state/language/language.selectors";
import { LanguageSettings } from "../../state/language/language.model";

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false,
})
export class TranslatePipe implements PipeTransform {
    private __latestValue$$: any;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly languageStore: Store<LanguageSettings>,
    ) {
        this.languageStore.pipe(select(translation), takeUntilDestroyed()).subscribe((latestValue) => {
            this.__latestValue$$ = latestValue;
            this.cdr.markForCheck();
        });
    }

    public transform<Context>(value: string, context?: Context): string {
        return value.split('.').reduce((translation, key) => translation?.[key], this.__latestValue$$) ?? value;
    }
}