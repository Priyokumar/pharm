import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMedicine } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  collection = environment.collection.Medicines;
  constructor(private firestore: AngularFirestore) {}

  getMedicines(): Observable<IMedicine[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: IMedicine = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addMedicine(data: IMedicine): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collection).add(data);
  }

  updateMedicine(data: IMedicine, id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).set(data);
  }

  removeMedicine(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
