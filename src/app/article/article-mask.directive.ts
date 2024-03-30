import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from "@angular/core";
import Fuse from 'fuse.js';
import { SPECALS } from "./specals.const";

@Directive({
    standalone: true,
    selector: '[mask]',
})
export class ArticleMaskDirective {
    /**
     * All guesses that have been made so far.
     */
    @Input() guesses: string[] | null = [];

    /**
     * The word currently being massed by the directive.
     */
    @Input() word!: string;

    constructor(
        private readonly _element: ElementRef,
        private readonly renderer: Renderer2,
    ) {}

    public ngAfterViewInit(): void {
        this.adjustClasses();
    }

    public ngOnChanges(_changes: SimpleChanges): void {
        this.adjustClasses();
    }

    public adjustClasses() {
        this.renderer.addClass(this._element.nativeElement, 'masked');
        
        if (SPECALS.includes(this.word)) {
            this.renderer.addClass(this._element.nativeElement, 'specal');
        } else if (this.guesses) {
            const fuse = new Fuse(this.guesses, {
                keys: ['word'],
                includeScore: true,
                isCaseSensitive: true,
                threshold: 0.3
            });

            const test = fuse.search(this.word)?.[0];
            if (test) {
                if (test.score === 0) {
                    this.renderer.removeClass(this._element.nativeElement, 'masked');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warm');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--hot');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--cold');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warmer');
                } else if (this._element.nativeElement && test.score && test.score <= 0.005) {
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warmer');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warm');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--hot');
                    
                    this.renderer.addClass(this._element.nativeElement, 'masked--cold');
                    // console.log('because of "', test.item, '" we marked "', this.word, '" as cold with a score of', test.score);
                } else if (this._element.nativeElement && test.score && test.score <= 0.05) {
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warmer');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--cold');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--hot');
                    
                    this.renderer.addClass(this._element.nativeElement, 'masked--warm');
                    // console.log('because of "', test.item, '" we marked "', this.word, '" as warm with a score of', test.score);

                } else if (this._element.nativeElement && test.score && test.score <= 0.1) {
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warm');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--cold');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--hot');
                    
                    this.renderer.addClass(this._element.nativeElement, 'masked--warmer');
                    // console.log('because of "', test.item, '" we marked "', this.word, '" as warmer with a score of', test.score);

                } else if (this._element.nativeElement && test.score && test.score <= 0.2) {
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warm');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--cold');
                    this.renderer.removeClass(this._element.nativeElement, 'masked--warmer');

                    this.renderer.addClass(this._element.nativeElement, 'masked--hot');
                    // console.log('because of "', test.item, '" we marked "', this.word, '" as hot with a score of', test.score);
                }
            }
        }
    }
}