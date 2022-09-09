import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
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
    path: 'tasks',
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'new',
        loadChildren: () =>
          import('./tasks/pages/task-edit/task-edit.module').then(
            (m) => m.TaskEditPageModule
          ),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./tasks/pages/task-edit/task-edit.module').then(
            (m) => m.TaskEditPageModule
          ),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'paginated',
        loadChildren: () =>
          import(
            './tasks/pages/task-list-paginated/task-list-paginated.module'
          ).then((m) => m.TaskListPaginatedPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: '',
        loadChildren: () =>
          import('./tasks/pages/task-list/task-list.module').then(
            (m) => m.TaskListPageModule
          ),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tasks',
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
