import { ToastService } from './../../helpers/toast.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TaskRepository } from '../repositories/task-repository';
import { GetByIdTaskHandler } from './getbyid-task-handler';

describe('', () => {
  const taskRepository = jasmine.createSpyObj<TaskRepository>(
    'TaskRepository',
    ['getById']
  );

  const toast = jasmine.createSpyObj<ToastService>('ToastService', [
    'showError',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: ToastService, useValue: toast },
        { provide: TaskRepository, useValue: taskRepository },
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: GetByIdTaskHandler = TestBed.inject(GetByIdTaskHandler);
    expect(service).toBeTruthy();
  });

  it('deve retornar uma tarefa', async () => {
    // Dado
    const id = 'XXX';
    taskRepository.getById.and.returnValue(
      Promise.resolve({
        id: 'XXX',
        title: 'Test',
        description: 'Description test',
        done: false,
        user: 'user',
      })
    );

    // Quando
    const service: GetByIdTaskHandler = TestBed.inject(GetByIdTaskHandler);
    const response = await service.execute(id);

    // Então
    expect(response).toBeTruthy();
    expect(response.id).toBe('XXX');
    expect(response.title).toBe('Test');
  });

  it('deve retornar erro caso a tarefa não exista', async () => {
    // Dado
    const id = 'XXX';
    taskRepository.getById.and.returnValue(Promise.reject(''));

    // Quando
    const service: GetByIdTaskHandler = TestBed.inject(GetByIdTaskHandler);
    await service.execute(id);

    // Então
    expect(toast.showError).toHaveBeenCalledWith('Erro ao buscar uma tarefa');
  });
});
