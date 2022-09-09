import { TaskPaginatedRepository } from './../../repositories/task-paginated-repository';
import { IonInfiniteScroll } from '@ionic/angular';
import { User } from '../../../account/models/user';
import { CurrentUserService } from '../../../account/business-rules/current-user.service';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'task-list-paginated.page.html',
  styleUrls: ['task-list-paginated.page.scss'],
})
export class TaskListPaginatedPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  user: User;
  tasks$: Observable<Task[]>;

  constructor(
    private currentUser: CurrentUserService,
    private taskPaginatedRepository: TaskPaginatedRepository
  ) {}

  async ionViewDidEnter(): Promise<void> {
    this.user = await this.currentUser.loadCurrentUser();
    this.tasks$ = this.taskPaginatedRepository.getData();
    this.taskPaginatedRepository.getAll(this.user.uid);

    // desabilitar o scroll
    this.taskPaginatedRepository
      .disableNextLoading()
      .subscribe((disableNext) => {
        if (disableNext) {
          this.infiniteScroll.disabled = true;
        }
      });

    // para esconder o loading que exibe na tela
    this.taskPaginatedRepository.finished().subscribe((finished) => {
      if (finished) {
        this.infiniteScroll.complete();
      }
    });
  }

  loadData() {
    this.taskPaginatedRepository.nextPage(this.user.uid);
  }
}
