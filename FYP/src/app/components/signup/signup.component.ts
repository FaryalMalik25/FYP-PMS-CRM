// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SignupService } from '../../services/signup.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(private fb: FormBuilder, private signupService: SignupService) {
//     this.signupForm = this.fb.group({
//       fname: ['', [Validators.required]],
//       lname: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       role: ['', [Validators.required]]
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       this.signupService.signup(this.signupForm.value).subscribe(
//         response => console.log('Success!', response),
//         error => console.error('Error!', error)
//       );
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SignupService } from '../../services/signup.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   signupForm: FormGroup;
//   errorMessage: string = ''; // Store the error message
//   emailAlreadyExists: boolean = false; // Flag to track if the email exists

//   constructor(private fb: FormBuilder, private signupService: SignupService) {
//     this.signupForm = this.fb.group({
//       fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
//       lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
//       email: ['', [Validators.required, Validators.email, Validators.pattern(/\S+@\S+\.\S+/)]],
//       password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
//       role: ['', [Validators.required, Validators.pattern(/^(admin|client)$/)]]
//     });
//   }

//   onSubmit() {
//     this.errorMessage = ''; // Reset the error message each time the form is submitted
//     if (this.signupForm.valid) {
//       this.signupService.signup(this.signupForm.value).subscribe({
//         next: (response) => {
//           console.log('Success!', response);
//           this.emailAlreadyExists = false; // Reset flag on successful registration
//         },
//         error: (errorMessage) => {
//           // Set the error message based on the specific error
//           if (errorMessage === 'Email already exists') {
//             this.emailAlreadyExists = true;
//           } else {
//             this.errorMessage = errorMessage; // Set general error message
//           }
//           console.error('Error!', errorMessage);
//         }
//       });
//     }
//   }

//   getErrorMessage(controlName: string): string {
//     const control = this.signupForm.get(controlName);
    
//     // Check if the user has interacted with the control and if there are errors.
//     if (control && (control.dirty || control.touched)) {
//       if (control.hasError('required')) {
//         return 'You must enter a value';
//       } else if (control.hasError('minlength')) {
//         const requiredLength = control.getError('minlength').requiredLength;
//         return `Value must be at least ${requiredLength} characters long`;
//       } else if (control.hasError('maxlength')) {
//         const requiredLength = control.getError('maxlength').requiredLength;
//         return `Value cannot be more than ${requiredLength} characters long`;
//       } else if (control.hasError('email')) {
//         return 'Not a valid email';
//       } else if (control.hasError('pattern')) {
//         return 'Not a valid input';
//       }
//       // Add additional error checks as necessary.
//     }
  
//     return ''; // If control is not interacted with yet or has no errors, return empty
//   }
  
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = ''; // Store the error message
  emailAlreadyExists: boolean = false; // Flag to track if the email exists

  constructor(private fb: FormBuilder, private signupService: SignupService ,private router: Router) {
    
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      role: ['', [Validators.required, Validators.pattern(/^(admin|client)$/)]]
    });
  }

  onSubmit() {
    this.markFormGroupTouched(this.signupForm); // Ensure all fields are touched on submit
    this.isLoading = true;
    this.errorMessage = ''; // Reset the error message each time the form is submitted

    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Success!', response);
          this.router.navigate(['/login']);
          this.emailAlreadyExists = false; // Reset flag on successful registration
          this.isLoading = false;
        },
        error: (errorMessage) => {
          // Set the error message based on the specific error
          if (errorMessage === 'Email already exists') {
            this.emailAlreadyExists = true;
          } else {
            this.errorMessage = errorMessage; // Set general error message
            this.isLoading = false;
          }
          console.error('Error!', errorMessage);
          this.isLoading = false;
        }
      });
    }
   
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      } else if (control.hasError('minlength')) {
        return `Value must be at least ${control.getError('minlength').requiredLength} characters long`;
      } else if (control.hasError('maxlength')) {
        return `Value cannot be more than ${control.getError('maxlength').requiredLength} characters long`;
      } else if (control.hasError('email')) {
        return 'Not a valid email';
      } else if (control.hasError('pattern')) {
        return 'Not a valid input';
      }
    }
    return ''; // If control is not interacted with yet or has no errors, return empty
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
  
      control?.markAsTouched();
  
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
}  

