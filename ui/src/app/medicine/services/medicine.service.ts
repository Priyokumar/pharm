import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMedicine } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private subBaseURL  = environment.baseURL+"/"+environment.apiEndpoints.Medicines;
  constructor(private http: HttpClient) {}

  getMedicines(): Observable<IMedicine[]> {
    return this.http.get<IMedicine[]>(this.subBaseURL);
  }

  addMedicine(data: IMedicine) {
    return this.http.post(this.subBaseURL, data);
  }

  updateMedicine(id: number, data: IMedicine) {
    return this.http.post(this.subBaseURL+"/"+id, data);
  }

  removeMedicine(id: number) {
    return this.http.delete(this.subBaseURL+"/"+id);
  }
}
