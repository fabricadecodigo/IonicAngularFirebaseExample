import { CurrentUserService } from './current-user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutHandler {
  constructor(
    private route: Router,
    private auth: AngularFireAuth,
    private currentUserService: CurrentUserService
  ) {}

  async execute() {
    await this.auth.signOut();
    this.currentUserService.clearCurrentUser();
    window.location.href = '/login';
  }
}
