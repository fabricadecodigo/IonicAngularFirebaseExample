import { Component, OnInit } from '@angular/core';
import { CreateAccountHandler } from '../../business-rules/create-account-handler';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.page.html',
  styleUrls: ['./create-account-page.page.scss'],
})
export class CreateAccountPagePage implements OnInit {
  account = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private createAccountHandler: CreateAccountHandler) {}

  ngOnInit() {}

  async onSubmit() {
    await this.createAccountHandler.execute(
      this.account.name,
      this.account.email,
      this.account.password
    );
  }
}
