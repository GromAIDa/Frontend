import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./pages/news-page/news-page.module').then((m) => m.NewsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}