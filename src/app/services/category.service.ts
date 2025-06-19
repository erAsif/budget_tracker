import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8000/api/categories/'; 

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
  
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
