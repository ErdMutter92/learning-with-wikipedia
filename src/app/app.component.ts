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
import { Observable, combineLatest, map, of, shareReplay, startWith, tap } from 'rxjs';
import { Language } from './language/language.enum';
import { ArticleMaskDirective } from './article/article-mask.directive';
import { Store, select } from '@ngrx/store';
import { Article } from './article/article.model';
import { articleContent, articleDescription, articleTitle, guesses } from './article/article.selectors';
import { ADD_GUESS, LOAD_ARTICLE } from './article/article.actions';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleMaskDirective,
    RouterOutlet,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule
  ],
  providers: [WikipediaAPIService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wiki-de';

  public readonly languageSettings$ = of({ language: Language.deutsch });

  public readonly title$ = this.articleStore.pipe(select(articleTitle));
  public readonly description$ = this.articleStore.pipe(select(articleDescription));
  public readonly content$ = this.articleStore.pipe(select(articleContent));
  public readonly guesses$ = this.articleStore.pipe(select(guesses));

  public readonly article$ = combineLatest(
    [this.title$, this.description$, this.content$]
  ).pipe(
    shareReplay(1),
    map(([title, description, content]) => ({
      title,
      description,
      content
    })),
  );

  public guessForm = this.formBuilder.group({
    currentGuess: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly articleStore: Store<Article>,
  ) {}

  public ngOnInit() {
    this.articleStore.dispatch(LOAD_ARTICLE());
  }

  public submit() {
    console.log(this.guessForm.value);
    const guess = this.guessForm.value.currentGuess;

    if (guess) {
      this.articleStore.dispatch(ADD_GUESS({ guess }));
    }

    this.guessForm.reset();
  }
}
