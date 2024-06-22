import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = 'http://localhost:3000'; // URL to web API

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Unexpected error occurred. Please try again.'; // Default message
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('Network error:', error.error.message);
      message = 'Network error occurred. Please try again.';
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      if (error.status === 409) {
        message = 'Email already exists'; // Specific message for email conflict
      } else if (error.status === 500) {
        message = 'Internal server error. Please contact support.'; // Server error
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(message);
  }
}
 
