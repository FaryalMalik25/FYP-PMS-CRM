

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  private baseUrl = 'http://localhost:3000'; // Assuming your Express.js backend runs on the same server at '/api'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/jira/tasks`);
  }
}

