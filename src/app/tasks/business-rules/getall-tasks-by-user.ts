import { Observable } from 'rxjs';
import { TaskRepository } from './../repositories/task-repository';
import { Task } from '../models/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAllTasksByUser {
  constructor(private taskRepository: TaskRepository) {}

  execute(user: string): Observable<Task[]> {
    return this.taskRepository.getAll(user);
  }
}
