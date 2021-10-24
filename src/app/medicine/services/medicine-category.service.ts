import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMedicineCategory } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineCategoryService {
  collection = environment.collection.MedicineCategories;
  constructor(private firestore: AngularFirestore) {}

  getMedicineCategories(): Observable<IMedicineCategory[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: IMedicineCategory = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addMedicineCategory(data: IMedicineCategory): Promise<DocumentReference<unknown>>  {
    return this.firestore.collection(this.collection).add(data);
  }

  removeMedicineCategory(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
