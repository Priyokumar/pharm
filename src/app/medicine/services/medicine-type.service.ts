import { Injectable } from '@angular/core';
import { IMedicineType } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class MedicineTypeService {

  constructor() { }

  getMedicineTypes():IMedicineType[] {
    const data = localStorage.getItem("medicineTypes");
    if (!data) return [];
    return JSON.parse(data);
  }

  addMedicineType(data: IMedicineType):void {
    const existingData = localStorage.getItem("medicineTypes");
    if (!existingData) {
      const d:IMedicineType[] = [data];
      localStorage.setItem("medicineTypes", JSON.stringify(d));
    };
    const d:IMedicineType[] = JSON.parse(existingData);
    d.push(data);
    localStorage.setItem("medicineTypes", JSON.stringify(d));
  }
}
