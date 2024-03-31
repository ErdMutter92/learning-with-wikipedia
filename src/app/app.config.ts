import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { articleReducer } from './state/library/article.reducer';
import { ArticleEffects } from './state/library/article.effects';
import { WikipediaAPIService } from './common/wikipedia/wikipedia.service';
import { languageReducer } from './state/language/language.reducer';
import { LanguageEffects } from './state/language/language.effects';
import { localStorageSyncReducer } from './state/storage/storage.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ARTICLE_FEATURE } from './state/library/article.selectors';
import { LANGUAGE_FEATURE } from './state/language/language.selectors';

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
