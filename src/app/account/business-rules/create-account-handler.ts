import { UserRepository } from '../repositories/user-repository';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountHandler {
  constructor(
    private auth: AngularFireAuth,
    private userRespository: UserRepository,
    private currentUserService: CurrentUserService
  ) {}

  async execute(name: string, email: string, password: string): Promise<void> {
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
