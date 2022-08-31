import { LogoutHandler } from './../account/business-rules/logout-handler';
import { GetAllTasksByUserHandler } from '../tasks/business-rules/getall-tasks-by-user-handler';
import { LoadingController } from '@ionic/angular';
import { User } from './../account/models/user';
import { CurrentUserService } from './../account/business-rules/current-user.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks/models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: User;
  tasks$: Observable<Task[]>;

  constructor(
    private loading: LoadingController,
    private currentUser: CurrentUserService,
    private getAllTasksByUser: GetAllTasksByUserHandler,
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
}
