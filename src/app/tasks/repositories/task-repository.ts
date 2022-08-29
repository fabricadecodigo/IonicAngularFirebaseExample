import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  constructor(private db: AngularFirestore) {}

  getAll(user: string): Observable<Task[]> {
    const response = this.db
      .collection<Task>('tasks', (q) => q.where('user', '==', user))
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
}
