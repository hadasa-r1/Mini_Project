import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7206/api/exec';

  constructor(private http: HttpClient) { }

  /**
   * פונקציה גנרית לביצוע כל הקריאות ל-Stored Procedures
   * @param procedureName שם הפרוצדורה ב-SQL (למשל sp_Books_GetAll)
   * @param parameters אובייקט עם הפרמטרים שהפרוצדורה צריכה
   */
  execute(procedureName: string, parameters: any = {}): Observable<any> {
    const requestBody = {
      procedureName: procedureName,
      parameters: parameters
    }; 

    return this.http.post<any>(this.apiUrl, requestBody);
  }
}