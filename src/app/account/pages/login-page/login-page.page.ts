import { LoginHandler } from './../../business-rules/login-handler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  login = {
    email: '',
    password: '',
  };

  constructor(private loginHandler: LoginHandler) {}

  ngOnInit() {}

  async onSubmit() {
    await this.loginHandler.execute(this.login.email, this.login.password);
  }
}
