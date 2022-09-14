import { CurrentUserService } from './../../../account/business-rules/current-user.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskListPaginatedPage } from './task-list-paginated.page';
import { TaskPaginatedRepository } from '../../repositories/task-paginated-repository';

describe('TaskListPaginatedPage', () => {
  let component: TaskListPaginatedPage;
  let fixture: ComponentFixture<TaskListPaginatedPage>;

  const currentUserService = jasmine.createSpyObj<CurrentUserService>(
    'CurrentUserService',
    ['loadCurrentUser']
  );

  const taskPaginatedRepository = jasmine.createSpyObj<TaskPaginatedRepository>(
    'TaskPaginatedRepository',
    ['getData', 'nextPage', 'disableNextLoading', 'finished']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListPaginatedPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: CurrentUserService, useValue: currentUserService },
        {
          provide: TaskPaginatedRepository,
          useValue: taskPaginatedRepository,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListPaginatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
