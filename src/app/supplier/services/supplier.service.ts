import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISupplier } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  collection = environment.collection.Suppliers;
  constructor(private firestore: AngularFirestore) {}

  getSuppliers(): Observable<ISupplier[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        map((data) => {
          if (!data || data.length <= 0) return [];
          return data.map((ele) => {
            const d: ISupplier = ele.payload.doc.data() as any;
            d.id = ele.payload.doc.id;
            return d;
          });
        })
      );
  }

  addSupplier(data: ISupplier): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collection).add(data);
  }

  updateSupplier(data: ISupplier, id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).set(data);
  }

  removeSupplier(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
