import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7206/api/exec';

  constructor(private http: HttpClient) { }

  execute(procedureName: string, parameters: any = {}): Observable<any> {
    const requestBody = {
      procedureName: procedureName,
      parameters: parameters
    }; 

    return this.http.post<any>(this.apiUrl, requestBody);
  }

}
