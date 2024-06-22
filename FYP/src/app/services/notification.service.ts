import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  resetNotifications(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, { userId });
  }
}
