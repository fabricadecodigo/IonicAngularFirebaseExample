import { UserRepository } from '../repositories/user-repository';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../../helpers';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountHandler {
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private loading: LoadingController,
    private toast: ToastService,
    private currentUserService: CurrentUserService,
    private userRespository: UserRepository
  ) {}

  async execute(name: string, email: string, password: string): Promise<void> {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();

    try {
      this.createAccount(name, email, password);

      await this.toast.showSuccess('Conta criada com sucesso');
      this.router.navigate(['/login']);
    } catch (error) {
      await this.toast.showError('Erro ao criar conta');
    } finally {
      loading.dismiss();
    }
  }

  private async createAccount(name: string, email: string, password: string) {
    const authResponse = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (authResponse.user) {
      await this.userRespository.update(authResponse.user.uid, name);
    }

    this.currentUserService.setCurrentUser(authResponse.user.uid, name, email);
  }
}
