import { ToastService } from './../../helpers';
import { TaskRepository } from '../repositories/task-repository';
import { Task } from '../models/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetByIdTaskHandler {
  constructor(
    private toast: ToastService,
    private taskRepository: TaskRepository
  ) {}

  async execute(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.getById(id);
      return task;
    } catch (error) {
      await this.toast.showError('Erro ao buscar uma tarefa');
    }
  }
}
