import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Color } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async showSuccess(message: string) {
    await this.show(message, 'success');
  }

  async showError(message: string) {
    await this.show(message, 'danger');
  }

  private async show(message: string, color: Color) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 3000,
    });
    toast.present();
  }
}
