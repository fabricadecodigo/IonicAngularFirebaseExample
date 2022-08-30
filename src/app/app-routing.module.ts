import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./account/pages/login-page/login-page.module').then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import(
        './account/pages/create-account-page/create-account-page.module'
      ).then((m) => m.CreateAccountPagePageModule),
  },
  {
    path: 'login-page',
    loadChildren: () =>
      import('./account/pages/login-page/login-page.module').then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: 'create-account-page',
    loadChildren: () =>
      import(
        './account/pages/create-account-page/create-account-page.module'
      ).then((m) => m.CreateAccountPagePageModule),
  },
  {
    path: 'tasks',
    children: [
      {
        path: 'new',
        loadChildren: () =>
          import('./tasks/pages/task-edit/task-edit.module').then(
            (m) => m.TaskEditPageModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./tasks/pages/task-edit/task-edit.module').then(
            (m) => m.TaskEditPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
