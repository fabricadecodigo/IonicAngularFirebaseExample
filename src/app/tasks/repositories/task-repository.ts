import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  private collectionName = 'tasks';

  constructor(private db: AngularFirestore) {}

  getAll(user: string): Observable<Task[]> {
    const response = this.db
      .collection<Task>(this.collectionName, (q) => q.where('user', '==', user).orderBy('title'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data } as Task;
          })
        )
      );

    return response;
  }

  getById(id: string): Promise<Task> {
    return new Promise((resolve) => {
      const taskSubscription = this.db
        .collection(this.collectionName)
        .doc(id)
        .snapshotChanges()
        .pipe(
          map((action) => {
            const data = action.payload.data() as Task;
            return { id: action.payload.id, ...data } as Task;
          })
        )
        .subscribe((response) => {
          taskSubscription.unsubscribe();
          resolve(response);
        });
    });
  }

  async create(task: Task) {
    const { id, ...data } = task;
    await this.db.collection(this.collectionName).add(data);
  }

  async update(task: Task) {
    const { id, ...data } = task;
    await this.db.collection(this.collectionName).doc(id).set(data);
  }
}
