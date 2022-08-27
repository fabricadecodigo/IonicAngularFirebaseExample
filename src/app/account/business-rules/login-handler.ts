import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserRepository } from '../repositories/user-repository';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginHandler {
  constructor(
    private auth: AngularFireAuth,
    private userRepository: UserRepository,
    private currentUserService: CurrentUserService
  ) {}

  async execute(email: string, password: string): Promise<void> {
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
    } catch (error) {
      throw new Error('Erro ao efetuar login');
    }
  }
}
