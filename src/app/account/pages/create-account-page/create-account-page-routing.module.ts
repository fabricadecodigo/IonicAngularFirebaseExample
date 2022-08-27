import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAccountPagePage } from './create-account-page.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAccountPagePageRoutingModule {}
