import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
      },
      // {
      //   path: '**',
      //   pathMatch: 'full',
      //   redirectTo: 'sign-in',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
