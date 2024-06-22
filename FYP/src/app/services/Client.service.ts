import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/api/clients'; // Change this to your actual API endpoint

  constructor(private http: HttpClient) { }
  getClientByIds(clientIds: string[]): Observable<Client[]> {
  
    return this.http.get<Client[]>(`/api/clients?ids=${clientIds.join(',')}`);
}
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
 
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
