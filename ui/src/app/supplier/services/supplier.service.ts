import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplier } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private subBaseURL =
    environment.baseURL + '/' + environment.apiEndpoints.Suppliers;
  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(this.subBaseURL);
  }

  addSupplier(data: ISupplier) {
    return this.http.post(this.subBaseURL, data);
  }

  updateSupplier(id: number, data: ISupplier) {
    return this.http.put(this.subBaseURL + '/' + id, data);
  }

  removeSupplier(id: number) {
    return this.http.delete(this.subBaseURL + '/' + id);
  }
}
