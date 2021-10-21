import { Injectable } from '@angular/core';
import { IMedicineCategory } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class MedicineCategoryService {

constructor() { }

getMedicineCategories():IMedicineCategory[] {
  const data = localStorage.getItem("medicineCategories");
  if (!data) return [];
  return JSON.parse(data);
}

addMedicineCategory(data: IMedicineCategory):void {
  const existingData = localStorage.getItem("medicineCategories");
  if (!existingData) {
    const d:IMedicineCategory[] = [data];
    localStorage.setItem("medicineCategories", JSON.stringify(d));
  };
  const d:IMedicineCategory[] = JSON.parse(existingData);
  d.push(data);
  localStorage.setItem("medicineCategories", JSON.stringify(d));
}

removeMedicineCategory(id: string):void {
  const existingData = localStorage.getItem("medicineCategories");
  const d:IMedicineCategory[] = JSON.parse(existingData);
  const i = d.findIndex(ele=>ele.id === id);
  d.splice(i,1);
  localStorage.setItem("medicineCategories", JSON.stringify(d));
}

}
