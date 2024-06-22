// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
 
//   isAccountCreated:any;
//   displaymsg:any;
//   isUserValid:boolean=false;
//   sucess:boolean=true;
// constructor( 
// private router: Router){

// }
// ngOnInit(): void {
  
// }
// signinForm=new FormGroup({
//   email:new FormControl('',[Validators.required,Validators.email]),
//   password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)])
// });
//   onSubmit() {
//     if (this.signinForm.valid) {
//       const email = this.signinForm.value.email;
//       const password = this.signinForm.value.password;
      
//       if (this.sucess) {
//        console.log("success");
//       } 
//     } else {
//       this.signinForm.markAllAsTouched();
//     }
//   }

//   get signinFormControl() {
//     return this.signinForm.controls;
//   }
// }

// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust the path if necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;  // Flag to track loading state
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isLoading = true;  // Activate loading state
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          // Navigate based on the role
          if (response.role === 'admin') {
            // Navigate to the admin component
            this.router.navigate(['/admin']);
          } else {
            // Navigate to the client dashboard
            this.router.navigate(['/client']);
          }
          this.isLoading = false;  // Deactivate loading state
        },
        error: (error: any) => {
          this.errorMessage = error;
          this.isLoading = false;  // Deactivate loading state
        }
      });
      
    } else {
      this.isLoading = false;  // Ensure loading is disabled if form is invalid
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'You must enter a value';
      } else if (control.errors['email']) {
        return 'Not a valid email';
      } else if (control.errors['minlength']) {
        return `Minimum length ${control.errors['minlength'].requiredLength} characters`;
      }
    }
    return ''; // If control is not interacted with yet or has no errors, return empty
  }
}

