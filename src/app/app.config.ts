import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { articleReducer } from './article/article.reducer';
import { ArticleEffects } from './article/article.effects';
import { WikipediaAPIService } from './wikipedia.service';

export const appConfig: ApplicationConfig = {
  providers: [
    WikipediaAPIService,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
    provideStore({ article: articleReducer }),
    provideEffects(ArticleEffects)
  ]
};
