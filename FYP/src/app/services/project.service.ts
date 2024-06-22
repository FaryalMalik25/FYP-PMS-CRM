import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private baseServerURL = "https://localhost:44385/api/";
 

  private apiUrl = 'http://localhost:3000';
  private Url = 'http://localhost:3000/projects';
  
  private baseUrl = 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }
 
  getProjects(): Observable<any> {
        return this.http.get(`${this.baseUrl}/my-projects`);
      }
      getProjectss(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl);
      }



      getsProjects(): Observable<any[]> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        });
        return this.http.get<any[]>(`${this.baseUrl}/client/projects`, { headers });
      }

      getProjectCount(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/count`);
      }
     
      
  getAllProjectDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-project-details`);
  }

  
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseServerURL + 'Projects');
  }

 
  getProjectByKey(key: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${key}`);
  }


getProjectsByClientId(clientId: string): Observable<Project[]> {
  const token = this.getToken(); // Assume you have a method to retrieve the stored token

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get<Project[]>(`/invoices/projects/${clientId}`, httpOptions);
}
getProjectById(projectId: string): Observable<Project> {
  return this.http.get<Project>(`${this.apiUrl}/projects/detail/${projectId}`);
}

getProjectsById(id: string): Observable<Project> {
  return this.http.get<Project>(`${this.baseUrl}/projects/${id}`);
}




private getToken(): string {
   
  return localStorage.getItem('authToken') || '';

}

  addProject(payload:any):Observable<any>{
    
    payload.id='00000000-0000-0000-0000-000000000000';
		return this.http.post<any>(this.baseServerURL +'Projects',payload);
	}
  GetProject(id:string): Observable<any> {
    return this.http.get<any>(this.baseServerURL + 'Projects/' + id);
  }

  UpdateProject(id:string,updateproject:any): Observable<any> {
    return this.http.put<any>(this.baseServerURL + 'Projects/' + id,updateproject);
  }
  DeleteProject(id:string): Observable<any> {
    return this.http.delete<any>(this.baseServerURL + 'Projects/' + id);
  }

}