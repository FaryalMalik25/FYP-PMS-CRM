import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentictateService {
  private baseUrl = 'http://localhost:3000'; // Adjust this URL to match your API endpoint

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred during the login process. Please try again.';
    // More specific error handling can be implemented here if required
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server returned code ${error.status}, body was: `, error.error);
      errorMessage = error.error.message || errorMessage;
    }
    return throwError(errorMessage);
  }
}
