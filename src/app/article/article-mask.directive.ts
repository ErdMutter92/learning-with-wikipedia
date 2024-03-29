import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    standalone: true,
    selector: '[mask]',
})
export class ArticleMaskDirective {
    @Input() guesses: string[] | null = [];
    @Input() word!: string;

    constructor(
        private readonly _element: ElementRef,
        private readonly renderer: Renderer2,
    ) {}

    public ngAfterViewInit(): void {
        if (['.', ',', ')', '('].includes(this.word)) {
            this.renderer.addClass(this._element.nativeElement, 'specal');
        } else if (this.guesses && this.guesses.includes(this.word)) {
            this.renderer.removeClass(this._element.nativeElement, 'masked');
        } else {
            this.renderer.addClass(this._element.nativeElement, 'masked');
        }
    }

    public ngOnChanges(_changes: SimpleChanges): void {
        if (['.', ',', ')', '('].includes(this.word)) {
            this.renderer.addClass(this._element.nativeElement, 'specal');
        } else if (this.guesses && this.guesses.includes(this.word)) {
            this.renderer.removeClass(this._element.nativeElement, 'masked');
        } else {
            this.renderer.addClass(this._element.nativeElement, 'masked');
        }
    }
}