import { Injectable } from '@angular/core';
import { IRecieving } from 'src/app/model';

@Injectable({
  providedIn: 'root',
})
export class RecievingService {
  constructor() {}

  getRecievings(): IRecieving[] {
    const data = localStorage.getItem('recievings');
    if (!data) return [];
    return JSON.parse(data);
  }

  addRecieving(data: IRecieving): void {
    const existingData = localStorage.getItem('recievings');
    if (!existingData) {
      const d: IRecieving[] = [data];
      localStorage.setItem('recievings', JSON.stringify(d));
    }
    const d: IRecieving[] = JSON.parse(existingData);
    d.push(data);
    localStorage.setItem('recievings', JSON.stringify(d));
  }

  updateRecieving(data: IRecieving, id: string): void {
    const existingData = localStorage.getItem('recievings');
    const d: IRecieving[] = JSON.parse(existingData);
    const i = d.findIndex((ele) => ele.id === id);
    d[i] = data;
    localStorage.setItem('recievings', JSON.stringify(d));
  }

  removeRecieving(id: string): void {
    const existingData = localStorage.getItem('recievings');
    const d: IRecieving[] = JSON.parse(existingData);
    const i = d.findIndex((ele) => ele.id === id);
    d.splice(i, 1);
    localStorage.setItem('recievings', JSON.stringify(d));
  }
}
