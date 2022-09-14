import { CurrentUserService } from './../../account/business-rules/current-user.service';
import { ToastService } from './../../helpers/toast.service';
import { IonicModule } from '@ionic/angular';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SaveTaskHandler } from './save-task-handler';
import { Location } from '@angular/common';
import { TaskRepository } from '../repositories/task-repository';
import { Task } from '../models/task';

describe('SaveTaskHandler', () => {
  const toast = jasmine.createSpyObj<ToastService>('ToastService', [
    'showSuccess',
    'showError',
  ]);

  const taskRepository = jasmine.createSpyObj<TaskRepository>(
    'TaskRepository',
    ['create', 'update']
  );

  const currentUserService = jasmine.createSpyObj<CurrentUserService>(
    'CurrentUserService',
    ['loadCurrentUser']
  );

  const location = jasmine.createSpyObj<Location>('Location', ['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ToastService, useValue: toast },
        { provide: TaskRepository, useValue: taskRepository },
        { provide: CurrentUserService, useValue: currentUserService },
        { provide: Location, useValue: location },
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    expect(service).toBeTruthy();
  });

  it('deve criar uma nova tarefa', async () => {
    // Dado
    const task: Task = {
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: '',
    };
    currentUserService.loadCurrentUser.and.returnValue(
      Promise.resolve({ name: 'Test user', uid: 'xxx', email: 'test@test.com' })
    );
    taskRepository.create.and.returnValue(Promise.resolve());

    // Quando
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    await service.execute(task);

    // Então
    expect(taskRepository.create).toHaveBeenCalledWith({
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: 'xxx',
    });
    expect(toast.showSuccess).toHaveBeenCalledWith('Tarefa salva com sucesso');
    expect(location.back).toHaveBeenCalledWith();
  });

  it('deve alterar uma tarefa', async () => {
    // Dado
    const task: Task = {
      id: '132',
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: '',
    };
    currentUserService.loadCurrentUser.and.returnValue(
      Promise.resolve({ name: 'Test user', uid: 'xxx', email: 'test@test.com' })
    );
    taskRepository.update.and.returnValue(Promise.resolve());

    // Quando
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    await service.execute(task);

    // Então
    expect(taskRepository.update).toHaveBeenCalledWith({
      id: '132',
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: 'xxx',
    });
    expect(toast.showSuccess).toHaveBeenCalledWith('Tarefa salva com sucesso');
    expect(location.back).toHaveBeenCalledWith();
  });

  it('deve exibir erro caso não carregue o usuário', async () => {
    // Dado
    const task: Task = {
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: '',
    };
    currentUserService.loadCurrentUser.and.returnValue(Promise.reject());

    // Quando
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    await service.execute(task);

    // Então
    expect(currentUserService.loadCurrentUser).toHaveBeenCalled();
    expect(toast.showError).toHaveBeenCalledWith('Erro ao salvar uma tarefa');
  });

  it('deve exibir erro caso não crie a tarefa', async () => {
    // Dado
    const task: Task = {
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: '',
    };
    currentUserService.loadCurrentUser.and.returnValue(
      Promise.resolve({ name: 'Test user', uid: 'xxx', email: 'test@test.com' })
    );
    taskRepository.create.and.returnValue(Promise.reject());

    // Quando
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    await service.execute(task);

    // Então
    expect(taskRepository.create).toHaveBeenCalled();
    expect(toast.showError).toHaveBeenCalledWith('Erro ao salvar uma tarefa');
  });

  it('deve exibir erro caso não altere a tarefa', async () => {
    // Dado
    const task: Task = {
      id: '1',
      title: 'Test 1',
      description: 'Test 1',
      done: false,
      user: '',
    };
    currentUserService.loadCurrentUser.and.returnValue(
      Promise.resolve({ name: 'Test user', uid: 'xxx', email: 'test@test.com' })
    );
    taskRepository.update.and.returnValue(Promise.reject());

    // Quando
    const service: SaveTaskHandler = TestBed.inject(SaveTaskHandler);
    await service.execute(task);

    // Então
    expect(taskRepository.update).toHaveBeenCalled();
    expect(toast.showError).toHaveBeenCalledWith('Erro ao salvar uma tarefa');
  });
});
