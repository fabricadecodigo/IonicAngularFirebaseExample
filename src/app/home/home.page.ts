import { LoadingController } from '@ionic/angular';
import { User } from './../account/models/user';
import { CurrentUserService } from './../account/business-rules/current-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;

  constructor(
    private loading: LoadingController,
    private currentUser: CurrentUserService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Aguarde...',
    });
    loading.present();
    try {
      this.user = await this.currentUser.getCurrentUser();
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados do usuário');
    } finally {
      loading.dismiss();
    }
  }
}
