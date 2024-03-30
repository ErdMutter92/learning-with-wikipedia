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
import { languageReducer } from './language/language.reducer';
import { LanguageEffects } from './language/language.effects';
import { localStorageSyncReducer } from './storage.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ARTICLE_FEATURE } from './article/article.selectors';
import { LANGUAGE_FEATURE } from './language/language.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    WikipediaAPIService,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
    provideStore(
      { [ARTICLE_FEATURE]: articleReducer, [LANGUAGE_FEATURE]: languageReducer },
      { metaReducers: [localStorageSyncReducer]}
    ),
    importProvidersFrom(StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: window.location.hostname === 'localhost', // Restrict extension to log-only mode
    })),
    provideEffects(ArticleEffects, LanguageEffects)
  ]
};
