import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskPaginatedRepository {
  private page = 100;
  private collectionName = 'tasks';
  private tableData: Task[] = [];
  private lastItem: QueryDocumentSnapshot<Task>;
  private data = new BehaviorSubject<Task[]>([]);
  private disableNext = new BehaviorSubject<boolean>(false);
  private finishLoading = new BehaviorSubject<boolean>(false);

  constructor(private db: AngularFirestore) {}

  getData() {
    return this.data.asObservable();
  }

  disableNextLoading() {
    return this.disableNext.asObservable();
  }

  finished() {
    return this.finishLoading.asObservable();
  }

  getAll(user: string) {
    this.tableData = [];
    this.finishLoading.next(false);
    this.db
      .collection<Task>(this.collectionName, (q) =>
        q.where('user', '==', user).orderBy('title').limit(this.page)
      )
      .snapshotChanges()
      .subscribe((response) => {
        this.processResult(response);
      });
  }

  nextPage(user: string) {
    this.finishLoading.next(false);

    this.db
      .collection<Task>(this.collectionName, (q) =>
        q
          .where('user', '==', user)
          .orderBy('title')
          .startAfter(this.lastItem)
          .limit(this.page)
      )
      .snapshotChanges()
      // .pipe(delay(1000)) // apenas para simular um deplay
      .subscribe((response) => {
        this.processResult(response);
      });
  }

  private processResult(items: DocumentChangeAction<Task>[]) {
    const hasItems = items.length > 0;
    if (hasItems) {
      this.lastItem = items[items.length - 1].payload.doc;
      this.mapToTable(items);
      if (items.length < this.page) {
        this.disableNext.next(true);
      } else {
        this.disableNext.next(false);
      }
    } else {
      this.disableNext.next(true);
    }
    this.finishLoading.next(true);
  }

  private mapToTable(items: DocumentChangeAction<Task>[]) {
    for (const item of items) {
      const task: Task = {
        id: item.payload.doc.id,
        ...item.payload.doc.data(),
      };
      this.tableData.push(task);
    }
    if (items.length > 0) {
      this.data.next(this.tableData);
    }
  }
}
