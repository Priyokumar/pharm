import { Injectable } from '@angular/core';
import { IMedicineType } from 'src/app/model';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineTypeService {
  collection = environment.collection.MedicineTypes;

  constructor(private firestore: AngularFirestore) {}

  getMedicineTypes(): Observable<IMedicineType[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: IMedicineType = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addMedicineType(data: IMedicineType): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collection).add(data);
  }

  removeMedicineCategory(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
