import { Injectable } from '@angular/core';
import { IMedicineType } from 'src/app/model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicineTypeService {
  private subBaseURL  = environment.baseURL+"/"+environment.apiEndpoints.MedicineTypes;
  constructor(private http: HttpClient) {}

  getMedicineTypes(): Observable<IMedicineType[]> {
    return this.http.get<IMedicineType[]>(this.subBaseURL);
  }

  addMedicineType(data: IMedicineType) {
    return this.http.post(this.subBaseURL, data);
  }

  updateMedicineType(id: number, data: IMedicineType) {
    return this.http.post(this.subBaseURL+"/"+id, data);
  }

  removeMedicineCategory(id: number) {
    return this.http.delete(this.subBaseURL+"/"+id);
  }
}
