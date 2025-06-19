import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyBudgetService {
  private baseUrl = 'http://localhost:8000/api/budgets/'; 

  constructor(private http: HttpClient) {}



  createBudget(data: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      return this.http.post(this.baseUrl, data, { headers });
  }

  getBudgets(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.get(this.baseUrl, { headers });

  }

  getBudgetCompare(month: number, year: number, amount: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get(`${this.baseUrl}compare/`, { headers });
  }
  
  updateBudget(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.put(`${this.baseUrl}${id}/`, data, {headers });
  }
}
