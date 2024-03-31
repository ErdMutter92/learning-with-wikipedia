import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: '',
        outlet: 'content',
        loadComponent: () => import('./reader.page').then(m => m.ReaderPage),
    },
    {
        path: '',
        outlet: 'right-drawer',
        loadComponent: () => import('./guess-drawer/guess.drawer').then(m => m.GuessDrawer),
    },
    {
        path: '',
        outlet: 'left-drawer',
        loadComponent: () => import('./left-drawer/left.drawer').then(m => m.LeftReaderDrawer),
    },
    {
        path: '',
        outlet: 'footer',
        loadComponent: () => import('./footer/footer.component').then(m => m.ReaderFooterComponent),
    }
];