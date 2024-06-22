// services/issue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createIssue(issue: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-issue`, issue);
  }

  getIssuesByProjectName(projectName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/issues/${projectName}`);
  }
}
