import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../../helpers';
import { UserRepository } from '../repositories/user-repository';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginHandler {
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private loading: LoadingController,
    private toast: ToastService,
    private currentUserService: CurrentUserService,
    private userRepository: UserRepository
  ) {}

  async execute(email: string, password: string): Promise<void> {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();
    try {
      const authResponse = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (authResponse.user) {
        const name = await this.userRepository.getName(authResponse.user.uid);

        this.currentUserService.setCurrentUser(
          authResponse.user.uid,
          name,
          email
        );
      }

      await this.toast.showSuccess('Login efetuado com sucesso');
      this.router.navigate(['/tasks']);
    } catch (error) {
      await this.toast.showError('Usuário/senha inválido(s)');
    } finally {
      loading.dismiss();
    }
  }
}
