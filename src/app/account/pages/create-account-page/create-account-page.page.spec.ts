import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CreateAccountHandler } from '../../business-rules/create-account-handler';

import { CreateAccountPagePage } from './create-account-page.page';

describe('CreateAccountPagePage', () => {
  let component: CreateAccountPagePage;
  let fixture: ComponentFixture<CreateAccountPagePage>;

  const createAccountHandler = jasmine.createSpyObj<CreateAccountHandler>(
    'CreateAccountHandler',
    ['execute']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccountPagePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: CreateAccountHandler, useValue: createAccountHandler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
