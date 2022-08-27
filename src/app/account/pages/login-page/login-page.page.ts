import { LoginHandler } from './../../business-rules/login-handler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private loginHandler: LoginHandler
  ) {}

  ngOnInit() {}

  async onSubmit() {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();
    try {
      await this.loginHandler.execute(
        this.login.email,
        this.login.password
      );

      const toast = await this.toast.create({
        message: 'Login efetuado com sucesso',
        duration: 3000,
      });
      toast.present();
      this.router.navigate(['/']);
    } catch (error) {
      const toast = await this.toast.create({
        message: 'Erro ao efetuar o login',
        duration: 3000,
      });
      toast.present();
    } finally {
      loading.dismiss();
    }
  }
}
