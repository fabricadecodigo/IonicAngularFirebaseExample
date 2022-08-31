import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskListPage } from './task-list.page';
import { TaskListPageRoutingModule } from './task-list-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TaskListPageRoutingModule],
  declarations: [TaskListPage],
})
export class TaskListPageModule {}
