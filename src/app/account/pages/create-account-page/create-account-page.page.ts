import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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

  constructor(
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private createAccountHandler: CreateAccountHandler
  ) {}

  ngOnInit() {}

  async onSubmit() {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();

    try {
      await this.createAccountHandler.execute(
        this.account.name,
        this.account.email,
        this.account.password
      );

      const toast = await this.toast.create({
        message: 'Conta criada com sucesso',
        duration: 3000,
      });
      toast.present();
      this.router.navigate(['/login']);
    } catch (error) {
      const toast = await this.toast.create({
        message: 'Erro ao criar conta',
        duration: 3000,
      });
      toast.present();
    } finally {
      loading.dismiss();
    }
  }
}
