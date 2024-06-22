// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000'; // Adjust this URL to match your API endpoint

//   constructor(private http: HttpClient) { }

 

//   // login(email: string, password: string): Observable<any> {
//   //   return this.http.post(`${this.apiUrl}/login`, { email, password }, {
//   //     headers: new HttpHeaders({'Content-Type': 'application/json'})
//   //   }).pipe(
//   //     catchError((error) => {
//   //       Optionally transform error for user consumption
//   //       return throwError(error);
//   //     })
//   //   );
//   // }
  


//   login(credentials: { email: string; password: string }) {
//     return this.http.post<{token: string, role: string}>('http://localhost:3000/login', credentials)
//       .pipe(
//         tap(response => {
//           localStorage.setItem('token', response.token);  // Store the token
//           localStorage.setItem('role', response.role);    // Store the role
//         })
//       );
//   }


//   logout() {
//     localStorage.removeItem('token');  // Remove the token on logout
//     console.log('User logged out');
//   }
//   private handleError(error: HttpErrorResponse) {
//     // You can customize this method to extract more detailed error messages based on the error object
//     let errorMessage = 'Unknown error!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side errors
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side errors
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(() => new Error(errorMessage));
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Adjust this URL to match your API endpoint
  private currentUserSubject: BehaviorSubject<any>;
  isLoggedIn:boolean=false;
  
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(user => {
          if (user && user.token) {
            // Store user details and JWT token in local storage to keep user logged in
            const userWithId = { ...user, _id: user.userId , fname: user.fname, lname: user.lname  }; // Ensure the user object has _id
            delete userWithId.userId; // Remove userId if it exists
            localStorage.setItem('currentUser', JSON.stringify(userWithId));
            localStorage.setItem('token', user.token);
            this.currentUserSubject.next(userWithId);
            this.isLoggedIn=true;
          }
        }),
        catchError(this.handleError)
      );

  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isLoggedIn=false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
