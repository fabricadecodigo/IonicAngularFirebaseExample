import { GetByIdTaskHandler } from './../../business-rules/getbyid-task-handler';
import { SaveTaskHandler } from './../../business-rules/save-task-handler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
})
export class TaskEditPage implements OnInit {
  title = 'Nova tarefa';
  currentId = '';
  taskInput = {
    title: '',
    description: '',
    done: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private getByIdTaskHandler: GetByIdTaskHandler,
    private saveTaskHandler: SaveTaskHandler
  ) {}

  async ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.title = 'Editando tarefa';
      const task = await this.getByIdTaskHandler.execute(this.currentId);
      this.taskInput = {
        title: task.title,
        description: task.description,
        done: task.done,
      };
    }
  }

  async onSubmit() {
    const task: Task = {
      id: this.currentId,
      title: this.taskInput.title,
      description: this.taskInput.description,
      user: '',
      done: this.taskInput.done,
    };

    await this.saveTaskHandler.execute(task);
  }
}
