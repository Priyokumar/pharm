import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventory } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private subBaseURL  = environment.baseURL+"/"+environment.apiEndpoints.Inventories;
  constructor(private http: HttpClient) {}

  getInventories(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(this.subBaseURL)
  }

  addInventory(data: IInventory) {
    return this.http.post(this.subBaseURL, data);
  }

  updateInventory(id: number, data: IInventory){
    return this.http.post(this.subBaseURL+"/"+id, data);
  }

  removeInventory(id: number) {
    return this.http.delete(this.subBaseURL+"/"+id);
  }
}
