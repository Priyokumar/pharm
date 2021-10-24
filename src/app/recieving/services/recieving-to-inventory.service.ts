import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, of } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { InventoryService } from 'src/app/inventory/services/inventory.service';
import { IRecieving } from 'src/app/model';

@Injectable({
  providedIn: 'root',
})
export class RecievingToInventoryService {
  constructor(private inventoryService: InventoryService) {}

  processRecieving(data: IRecieving) {
    const inventories$ = data.items.map((ele) => {
      return {
        opb$: this.inventoryService.getInventoryByMedicineAndBatch(
          ele.medicine.id,
          ele.batch.batchNo
        ),
        recieving: ele,
      };
    });
    const pis$ = [];
    inventories$.forEach((invData) => {
      const o$ = invData.opb$.pipe(
        switchMap((data) => {
          if (data) {
            data.sellingPrice = invData.recieving.sellingPrice;
            data.costPrice = invData.recieving.costPrice;
            data.batch.quantity += invData.recieving.batch.quantity;
            return of(this.inventoryService.updateInventory(data, data.id));
          } else {
            const inventory = {
              batch: {
                batchNo: invData.recieving.batch.batchNo,
                expiryDate: invData.recieving.batch.expiryDate,
                id: invData.recieving.batch.id,
                mfgDate: invData.recieving.batch.mfgDate,
                quantity: invData.recieving.batch.quantity,
              },
              costPrice: invData.recieving.costPrice,
              id: invData.recieving.id,
              isExpired: false,
              medicine: invData.recieving.medicine,
              sellingPrice: invData.recieving.sellingPrice,
            };
            return of(this.inventoryService.addInventory(inventory));
          }
        })
      );
      pis$.push(o$);
    });
    return combineLatest(...pis$);
  }
}
