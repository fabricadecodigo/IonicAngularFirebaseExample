import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginHandler } from '../../business-rules/login-handler';

import { LoginPagePage } from './login-page.page';

describe('LoginPagePage', () => {
  let component: LoginPagePage;
  let fixture: ComponentFixture<LoginPagePage>;

  const loginHandler = jasmine.createSpyObj<LoginHandler>('LoginHandler', [
    'execute',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPagePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: LoginHandler, useValue: loginHandler }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
