import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':lang',
        children: [
            {
                path: 'reader',
                loadComponent: () => import('./views/reader/reader.page').then(module => module.ReaderPage)
            },
            {
                path: 'vocab',
                loadComponent: () => import('./views/reader/reader.page').then(module => module.ReaderPage)
            },
            {
                path: 'settings',
                loadComponent: () => import('./views/reader/reader.page').then(module => module.ReaderPage)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'de/reader'
    }
];
