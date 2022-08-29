import { GetAllTasksByUser } from './../tasks/business-rules/getall-tasks-by-user';
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
  tasks: Observable<Task[]>;

  constructor(
    private loading: LoadingController,
    private currentUser: CurrentUserService,
    private getAllTasksByUser: GetAllTasksByUser
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();
    try {
      this.user = await this.currentUser.getCurrentUser();
      this.tasks = this.getAllTasksByUser.execute(this.user.uid);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados do usuário');
    } finally {
      loading.dismiss();
    }
  }
}
