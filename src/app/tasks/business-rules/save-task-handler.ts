import { ToastService } from './../../helpers';
import { CurrentUserService } from './../../account/business-rules/current-user.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { TaskRepository } from '../repositories/task-repository';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SaveTaskHandler {
  constructor(
    private loading: LoadingController,
    private location: Location,
    private toast: ToastService,
    private taskRepository: TaskRepository,
    private currentUserService: CurrentUserService
  ) {}

  async execute(task: Task) {
    try {
      const currentUser = await this.currentUserService.loadCurrentUser();
      task.user = currentUser.uid;

      if (task.id) {
        await this.taskRepository.update(task);
      } else {
        await this.taskRepository.create(task);
      }

      await this.toast.showSuccess('Tarefa salva com sucesso');
      this.location.back();
    } catch (error) {
      await this.toast.showError('Erro ao salvar uma tarefa');
    }
  }

  async executeInBatch() {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();
    try {
      const currentUser = await this.currentUserService.loadCurrentUser();

      for (let i = 964; i < 1000; i++) {
        const index = (i + 1).toString().padStart(4, '0');
        const task: Task = {
          title: `Tarefa ${index}`,
          description: `Descrição da tarefa ${index}`,
          done: false,
          user: currentUser.uid,
        };
        await this.taskRepository.create(task);
      }

      await this.toast.showSuccess('Tarefas salvas com sucesso');
    } catch (error) {
      await this.toast.showError('Erro ao salvar as tarefas');
    } finally {
      loading.dismiss();
    }
  }
}
