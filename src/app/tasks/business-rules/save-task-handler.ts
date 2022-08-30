import { ToastService } from './../../helpers';
import { CurrentUserService } from './../../account/business-rules/current-user.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { TaskRepository } from '../repositories/task-repository';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SaveTaskHandler {
  constructor(
    private location: Location,
    private toast: ToastService,
    private taskRepository: TaskRepository,
    private currentUserService: CurrentUserService
  ) {}

  async execute(task: Task) {
    try {
      const currentUser = await this.currentUserService.getCurrentUser();
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
}
