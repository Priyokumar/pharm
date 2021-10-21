import { Injectable } from '@angular/core';
import { ISupplier } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor() { }

  getSuppliers():ISupplier[] {
    const data = localStorage.getItem("suppliers");
    if (!data) return [];
    return JSON.parse(data);
  }

  addSupplier(data: ISupplier):void {
    const existingData = localStorage.getItem("suppliers");
    if (!existingData) {
      const d:ISupplier[] = [data];
      localStorage.setItem("suppliers", JSON.stringify(d));
    };
    const d:ISupplier[] = JSON.parse(existingData);
    d.push(data);
    localStorage.setItem("suppliers", JSON.stringify(d));
  }

  updateSupplier(data: ISupplier, id: string):void {
    const existingData = localStorage.getItem("suppliers");
    const d:ISupplier[] = JSON.parse(existingData);
    const i = d.findIndex(ele=>ele.id === id);
    d[i] = data;
    localStorage.setItem("suppliers", JSON.stringify(d));
  }

  removeSupplier(id: string):void {
    const existingData = localStorage.getItem("suppliers");
    const d:ISupplier[] = JSON.parse(existingData);
    const i = d.findIndex(ele=>ele.id === id);
    d.splice(i,1);
    localStorage.setItem("suppliers", JSON.stringify(d));
  }

}
