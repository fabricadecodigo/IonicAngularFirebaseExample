import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private db: AngularFirestore) {}

  async update(id: string, name: string) {
    await this.db.doc(`users/${id}`).set({ name });
  }

  async getName(id: string): Promise<string> {
    const response = await this.db
      .doc<{ name: string }>(`users/${id}`)
      .get()
      .toPromise();

    const name = response.data().name;
    return name;
  }
}
