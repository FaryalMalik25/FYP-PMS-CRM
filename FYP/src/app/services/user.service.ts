import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/clients'; // Update the URL if necessary
  private baseUrl = 'http://localhost:3000/api/recipients';
  private Url = 'http://localhost:3000/api/users';
  private ApiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRecipients(userType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?userType=${userType}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.Url}/${userId}`);
  }
  
  getClient(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/signup`, client);
  }

  updateClient(id: string, client: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

 
}


