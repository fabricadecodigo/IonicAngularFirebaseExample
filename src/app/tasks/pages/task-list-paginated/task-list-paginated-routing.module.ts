import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListPaginatedPage } from './task-list-paginated.page';

const routes: Routes = [
  {
    path: '',
    component: TaskListPaginatedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListPaginatedPageRoutingModule {}
