import { CurrentUserService } from './../../../account/business-rules/current-user.service';
import { LogoutHandler } from './../../../account/business-rules/logout-handler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GetAllTasksByUserHandler } from '../../business-rules/getall-tasks-by-user-handler';
import { SaveTaskHandler } from '../../business-rules/save-task-handler';

import { TaskListPage } from './task-list.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskListPage', () => {
  let component: TaskListPage;
  let fixture: ComponentFixture<TaskListPage>;

  const currentUserService = jasmine.createSpyObj<CurrentUserService>(
    'CurrentUserService',
    ['hasUser', 'getCurrentUser', 'loadCurrentUser']
  );

  const getAllTasksByUserHandler =
    jasmine.createSpyObj<GetAllTasksByUserHandler>('GetAllTasksByUserHandler', [
      'execute',
    ]);

  const saveTaskHandler = jasmine.createSpyObj<SaveTaskHandler>(
    'SaveTaskHandler',
    ['execute']
  );

  const logoutHandler = jasmine.createSpyObj<LogoutHandler>('LogoutHandler', [
    'execute',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: CurrentUserService, useValue: currentUserService },
        {
          provide: GetAllTasksByUserHandler,
          useValue: getAllTasksByUserHandler,
        },
        { provide: SaveTaskHandler, useValue: saveTaskHandler },
        { provide: LogoutHandler, useValue: logoutHandler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
