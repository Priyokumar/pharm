import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInventory } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  collection = environment.collection.Inventories;
  constructor(private firestore: AngularFirestore) {}

  getInventories(): Observable<IInventory[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: IInventory = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addInventory(data: IInventory): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collection).add(data);
  }

  updateInventory(data: IInventory, id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).set(data);
  }

  removeInventory(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }

  getInventoryByMedicineAndBatch(medicineId: string, batchNo: string) {
    return this.firestore
      .collection(this.collection, (ref) =>
        ref
          .where('medicine.id', '==', medicineId)
          .where('batch.batchNo', '==', batchNo)
          .limit(1)
      )
      .get()
      .pipe(
        map((data) => {
          if (!data || data.docs.length <= 0) return null;
          const d: IInventory = data.docs[0].data() as any;
          d.id = data.docs[0].id;
          return d;
        })
      )
  }
}
