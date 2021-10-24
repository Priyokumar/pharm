import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRecieving } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecievingService {
  collection = environment.collection.Recievings;
  constructor(private firestore: AngularFirestore) {}

  getRecievings(): Observable<IRecieving[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: IRecieving = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addRecieving(data: IRecieving): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collection).add(data);
  }

  removeRecieving(id: string):  Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
