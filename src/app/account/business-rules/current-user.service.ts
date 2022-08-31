import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user-repository';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUser: User;

  constructor(
    private auth: AngularFireAuth,
    private userRepository: UserRepository
  ) {}

  hasUser(): boolean {
    return this.currentUser ? true : false;
  }

  setCurrentUser(uid: string, name: string, email: string) {
    this.currentUser = {
      uid,
      name,
      email,
    };
  }

  clearCurrentUser() {
    this.currentUser = undefined;
  }

  loadCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const subscribe = this.auth.authState.subscribe(async (user) => {
        subscribe.unsubscribe();
        if (user) {
          const name = await this.userRepository.getName(user.uid);

          this.currentUser = {
            uid: user.uid,
            name,
            email: user.email,
          };
          resolve(this.currentUser);
        } else {
          reject();
        }
      });
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
