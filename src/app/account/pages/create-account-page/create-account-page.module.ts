import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPagePageRoutingModule } from './create-account-page-routing.module';
import { CreateAccountPagePage } from './create-account-page.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireAuthModule,
    CreateAccountPagePageRoutingModule,
  ],
  declarations: [CreateAccountPagePage],
})
export class CreateAccountPagePageModule {}
