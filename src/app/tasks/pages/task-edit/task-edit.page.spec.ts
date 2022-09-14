import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { TaskEditPage } from './task-edit.page';
import { GetByIdTaskHandler } from '../../business-rules/getbyid-task-handler';
import { SaveTaskHandler } from '../../business-rules/save-task-handler';

describe('TaskEditPage', () => {
  let component: TaskEditPage;
  let fixture: ComponentFixture<TaskEditPage>;

  const getByIdTaskHandler = jasmine.createSpyObj<GetByIdTaskHandler>(
    'GetByIdTaskHandler',
    ['execute']
  );

  const saveTaskHandler = jasmine.createSpyObj<SaveTaskHandler>(
    'SaveTaskHandler',
    ['execute']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: GetByIdTaskHandler, useValue: getByIdTaskHandler },
        { provide: SaveTaskHandler, useValue: saveTaskHandler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
