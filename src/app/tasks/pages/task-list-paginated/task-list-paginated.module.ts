import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskListPaginatedPage } from './task-list-paginated.page';
import { TaskListPaginatedPageRoutingModule } from './task-list-paginated-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskListPaginatedPageRoutingModule,
  ],
  declarations: [TaskListPaginatedPage],
})
export class TaskListPaginatedPageModule {}
