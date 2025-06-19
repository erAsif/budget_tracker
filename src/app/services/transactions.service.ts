import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiurl = 'http://localhost:8000/api/transactions/';

  constructor(private http: HttpClient) {}

  getAllTransaction(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.get(this.apiurl, { headers });
  }

  getTransactionSummary(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.get(`${this.apiurl}summary/`, { headers });
  }
  

  addTransaction(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.post(this.apiurl, data, { headers });
  }

  updateTransaction(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.put(`${this.apiurl}${id}/`, data, { headers });
  }

  deleteTransaction(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    return this.http.delete<void>(`${this.apiurl}${id}/`, { headers });
  }
}