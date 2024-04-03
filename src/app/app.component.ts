import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WikipediaAPIService } from './common/wikipedia/wikipedia.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { map, of, take } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { Language } from './state/language/language.enum';
import { ArticleMaskDirective } from './state/library/article-mask.directive';
import { Store, select } from '@ngrx/store';
import { Article } from './state/library/article.model';
import { MatMenuModule } from '@angular/material/menu';
import { loading } from './state/library/article.selectors';
import { ARTICLE_UNMASK, LOAD_ARTICLE, REMOVE_ARTICLE, RESET_ARTICLE } from './state/library/article.actions';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective } from './state/language/translate.directive';
import { LanguageSettings } from './state/language/language.model';
import { SET_LANGUAGE } from './state/language/language.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectedLanguage, translation } from './state/language/language.selectors';
import introJs from 'intro.js';
import { MatDividerModule } from '@angular/material/divider';
import { WordbankComponent } from './components/wordbank/wordbank.component';
import { ArticleSelectorComponent } from './components/article-selecter/article-selecter.component';
import { TranslatePipe } from './common/translate/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WordbankComponent,
    TranslatePipe,
    ReactiveFormsModule,
    ArticleMaskDirective,
    TranslateDirective,
    RouterOutlet,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ArticleSelectorComponent,
  ],
  providers: [WikipediaAPIService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly languageSettings$ = of({ language: Language.deutsch });

  public readonly loading$ = this.articleStore.pipe(select(loading));

  public readonly selectedLanguage$ = this.languageSettingsStore.pipe(select(selectedLanguage));
  public readonly translations = this.languageSettingsStore.pipe(select(translation));

  public languageSelector = new FormControl(Language.deutsch);
  
  constructor(
    private readonly articleStore: Store<Article>,
    private readonly languageSettingsStore: Store<LanguageSettings>,
  ) {}

  public ngAfterViewInit() {
    this.translations.pipe(map(({ tutorial }) => tutorial), take(1)).subscribe((steps) => {
      setTimeout(() => {
        introJs().setOptions({
          tooltipClass: 'eTutor',
          dontShowAgain: true,
          dontShowAgainCookie: 'tutor-v1-bwn-wiki-learning',
          steps
        }).start();
      }, 300);
    });
  }

  public ngOnInit() {
    this.selectedLanguage$.pipe(take(1)).subscribe((language: any) => {
      if (language) this.languageSelector.setValue(language);
    });

    this.articleStore.dispatch(LOAD_ARTICLE({ title: 'Wikipedia' }));

    this.languageSelector.valueChanges.subscribe((language) => {
      this.articleStore.dispatch(SET_LANGUAGE({ language } as any));
    })
  }

  public removeArticle(event: Event, id: any) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    this.articleStore.dispatch(REMOVE_ARTICLE({ id }));
  }

  public resetArticle(id: string) {
    this.articleStore.dispatch(RESET_ARTICLE({ id }));
  }

  public unmask(id: string) {
    this.articleStore.dispatch(ARTICLE_UNMASK({ id }));
  }

  public checkGuessInput(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.stopPropagation();
      return false;
    }

    return true;
  }
}
