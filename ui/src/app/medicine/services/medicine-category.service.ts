import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMedicineCategory } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineCategoryService {
  private subBaseURL  = environment.baseURL+"/"+environment.apiEndpoints.MedicineCategories;
  constructor(private http: HttpClient) {}

  getMedicineCategories(): Observable<IMedicineCategory[]> {
    return this.http.get<IMedicineCategory[]>(this.subBaseURL)
  }

  addMedicineCategory(data: IMedicineCategory)  {
    return this.http.post(this.subBaseURL, data);
  }

  updateMedicineCategory(id: number, data: IMedicineCategory) {
    return this.http.post(this.subBaseURL+"/"+id, data);
  }

  removeMedicineCategory(id: number) {
    return this.http.delete(this.subBaseURL+"/"+id);
  }
}
