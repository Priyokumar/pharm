import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecieving } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecievingService {
  private subBaseURL  = environment.baseURL+"/"+environment.apiEndpoints.Recievings;
  constructor(private http: HttpClient) {}

  getRecievings(): Observable<IRecieving[]> {
    return this.http.get<IRecieving[]>(this.subBaseURL)
  }

  addRecieving(data: IRecieving) {
    return this.http.post(this.subBaseURL, data);
  }

  removeRecieving(id: number) {
    return this.http.delete(this.subBaseURL+"/"+id);
  }
}
