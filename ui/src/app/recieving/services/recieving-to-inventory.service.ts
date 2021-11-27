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
}
