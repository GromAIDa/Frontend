import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  {
    path: 'goods',
    loadChildren: () =>
      import('./pages/goods-page/goods.module').then((m) => m.GoodsPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./pages/privacy-page/privacy-page.module').then((m) => m.PrivacyPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'join-us',
    loadChildren: () => import('@pages/volunteer/volunteer.module').then(m=>m.VolunteerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
