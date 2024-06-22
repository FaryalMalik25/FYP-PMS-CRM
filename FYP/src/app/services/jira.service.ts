import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { tap ,catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust as necessary

  constructor(private http: HttpClient) { }

  createProjectAndIssues(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-project`, projectData);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-project`, projectData);
  }
 
  
  createIssue(issueDetails: any, projectKey: string): Observable<any> {
    const issuePayload = {
      projectKey,
      summary: issueDetails.projectName,
      description: issueDetails.description,
      // Add other fields as per your requirement
    };
    return this.http.post(`${this.baseUrl}/create-issue`, issuePayload);
  }
  getAllProjectDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-all-project-details`);
  }
  // In your jira.service.ts or equivalent
getCategorizedTasksByProject(projectId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/categorized-tasks-by-project/${projectId}`);
}

getProjectProgress(projectId: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/projects/${projectId}/progress`).pipe(
    tap(response => console.log(`Progress data for project ${projectId}:`, response)),
    catchError(this.handleError)
  );


  
}
private handleError(error: any): Observable<never> {
  console.error('An error occurred', error);
  return throwError(error);
}

}



 

  
  



 


