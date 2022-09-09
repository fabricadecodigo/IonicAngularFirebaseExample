import { LogoutHandler } from '../../../account/business-rules/logout-handler';
import { GetAllTasksByUserHandler } from '../../business-rules/getall-tasks-by-user-handler';
import { LoadingController } from '@ionic/angular';
import { User } from '../../../account/models/user';
import { CurrentUserService } from '../../../account/business-rules/current-user.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { SaveTaskHandler } from '../../business-rules/save-task-handler';

@Component({
  selector: 'app-home',
  templateUrl: 'task-list.page.html',
  styleUrls: ['task-list.page.scss'],
})
export class TaskListPage {
  user: User;
  tasks$: Observable<Task[]>;

  constructor(
    private loading: LoadingController,
    private currentUser: CurrentUserService,
    private getAllTasksByUser: GetAllTasksByUserHandler,
    private saveTaskHandler: SaveTaskHandler,
    private logoutHandler: LogoutHandler
  ) {}

  async ionViewDidEnter(): Promise<void> {
    await this.loadCurrentUser();

    if (!this.tasks$) {
      this.tasks$ = this.getAllTasksByUser.execute(this.user.uid);
    }
  }

  async loadCurrentUser() {
    if (this.currentUser.hasUser()) {
      this.user = this.currentUser.getCurrentUser();
    } else {
      const loading = await this.loading.create({
        message: 'Aguarde...',
      });
      loading.present();
      try {
        this.user = await this.currentUser.loadCurrentUser();
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados do usuário');
      } finally {
        loading.dismiss();
      }
    }
  }

  async logout() {
    this.logoutHandler.execute();
  }

  async onAddTasksClicked() {
    await this.saveTaskHandler.executeInBatch();
  }
}
