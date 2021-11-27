import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventory, ISale } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private subBaseURL =
    environment.baseURL + '/' + environment.apiEndpoints.Sales;
  private inventoryURL = environment.baseURL + '/inventory';
  constructor(private http: HttpClient) {}

  getSales(): Observable<ISale[]> {
    return this.http.get<ISale[]>(this.subBaseURL);
  }

  getSale(id: number): Observable<ISale> {
    return this.http.get<ISale>(this.subBaseURL + '/' + id);
  }

  addSale(data: ISale) {
    return this.http.post(this.subBaseURL, data);
  }

  removeSale(id: number) {
    return this.http.delete(this.subBaseURL + '/' + id);
  }

  getInventoryByBatch(
    batchNo: string
  ): Observable<IInventory> {
    return this.http.get<IInventory>(this.inventoryURL, {
      params: { batchNo },
    });
  }
}
