import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WikipediaAPIService } from './wikipedia.service';
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
import { Observable, combineLatest, combineLatestAll, concatAll, forkJoin, map, of, shareReplay, startWith, take, tap } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { Language } from './language/language.enum';
import { ArticleMaskDirective } from './article/article-mask.directive';
import { Store, select } from '@ngrx/store';
import { Article } from './article/article.model';
import { MatMenuModule } from '@angular/material/menu';
import { allGuesses, allUngessedWords, allWords, articleContent, articleDescription, articleList, articleTitle, articleUnmasked, guesses, loading, selectedId } from './article/article.selectors';
import { ADD_ARTICLE, ADD_GUESS, ARTICLE_UNMASK, LOAD_ARTICLE, RESET_ARTICLE, SELECT_ARTICLE, TOGGLE_ARTICLE_MASK } from './article/article.actions';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateDirective } from './language/translate.directive';
import { LanguageSettings } from './language/language.model';
import { SET_LANGUAGE } from './language/language.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectedLanguage, translation } from './language/language.selectors';
import introJs from 'intro.js';
import { MatDividerModule } from '@angular/material/divider';

function noWhitespaceValidator(control: FormControl) {
  return (control.value || '').trim().length? null : { 'whitespace': true };       
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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
    MatMenuModule
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

  public readonly articleId$ = this.articleStore.pipe(select(selectedId));
  public readonly title$ = this.articleStore.pipe(select(articleTitle));
  public readonly unmasked$ = this.articleStore.pipe(select(articleUnmasked));
  public readonly description$ = this.articleStore.pipe(select(articleDescription));
  public readonly content$ = this.articleStore.pipe(select(articleContent));
  public readonly guesses$ = this.articleStore.pipe(select(guesses));

  public readonly articles$ = this.articleStore.pipe(select(articleList));

  public readonly wordbank$ = this.articleStore.pipe(select(allUngessedWords));

  public readonly article$ = combineLatest(
    [this.title$, this.description$, this.content$, this.unmasked$, this.articleId$]
  ).pipe(
    shareReplay(1),
    map(([title, description, content, unmasked, id]) => ({
      id,
      title,
      description,
      content,
      unmasked,
    })),
  );

  public guessForm = this.formBuilder.group({
    currentGuess: '',
  });

  public languageSelector = new FormControl(Language.deutsch);
  public articleSearch = this.formBuilder.group({
    search: '',
  });

  constructor(
    private formBuilder: FormBuilder,
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

  public submit() {
    const guess = this.guessForm.value.currentGuess;

    if (guess) {
      this.articleId$.pipe(take(1)).subscribe((id: string) => {
        this.articleStore.dispatch(ADD_GUESS({ guess, id }));

        this.guessForm.reset();
      })
    }
  }

  public addArticle() {
    const title = this.articleSearch.value.search;

    if (title) {
      this.articleStore.dispatch(LOAD_ARTICLE({ title }));

      this.articleSearch.reset();
    }
  }

  public selectArticle(id: any) {
    this.articleStore.dispatch(SELECT_ARTICLE({ id }));
  }

  public resetArticle(id: string) {
    this.articleStore.dispatch(RESET_ARTICLE({ id }));
  }

  public unmask(id: string) {
    this.articleStore.dispatch(ARTICLE_UNMASK({ id }));
  }
}
