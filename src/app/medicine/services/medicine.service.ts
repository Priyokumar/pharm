import { Injectable } from '@angular/core';
import { IMedicine } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

constructor() { }

getMedicines():IMedicine[] {
  const data = localStorage.getItem("medicines");
  if (!data) return [];
  return JSON.parse(data);
}

addMedicine(data: IMedicine):void {
  const existingData = localStorage.getItem("medicines");
  if (!existingData) {
    const d:IMedicine[] = [data];
    localStorage.setItem("medicines", JSON.stringify(d));
  };
  const d:IMedicine[] = JSON.parse(existingData);
  d.push(data);
  localStorage.setItem("medicines", JSON.stringify(d));
}

updateMedicine(data: IMedicine, id: string):void {
  const existingData = localStorage.getItem("medicines");
  const d:IMedicine[] = JSON.parse(existingData);
  const i = d.findIndex(ele=>ele.id === id);
  d[i] = data;
  localStorage.setItem("medicines", JSON.stringify(d));
}

removeMedicine(id: string):void {
  const existingData = localStorage.getItem("medicines");
  const d:IMedicine[] = JSON.parse(existingData);
  const i = d.findIndex(ele=>ele.id === id);
  d.splice(i,1);
  localStorage.setItem("medicines", JSON.stringify(d));
}

}
