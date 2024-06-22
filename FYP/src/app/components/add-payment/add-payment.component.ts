

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { InvoiceService } from '../../services/invoice.services'; // Adjust path as needed
// import { PaymentService } from '../../services/payment.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// import { MatDialogRef } from '@angular/material/dialog';
// @Component({
//   selector: 'app-add-payment',
//   templateUrl: './add-payment.component.html'
// })
// export class AddPaymentComponent implements OnInit {
//   paymentForm!: FormGroup;
//   invoices: any[] = [];
//   dueAmount: number = 0;
//   totalInvoiced: number = 0;
 

//   constructor(
//     private fb: FormBuilder, 
//     private invoiceService: InvoiceService, 
//     private paymentService: PaymentService,
//     private http: HttpClient,
//     private router: Router,
//     private dialogRef: MatDialogRef<AddPaymentComponent>
//   ) { }

//   ngOnInit(): void {
//     this.fetchInvoices();
//     this.paymentForm = this.fb.group({
//       invoiceId: [null, Validators.required],
//       paymentMethod: ['', Validators.required],
//       payment: ['', [Validators.required, Validators.min(1)]],
//       notentDate: ['', Validators.required],
//       amou: ['']
//     });

//     // Fetch all invoices
//     this.invoiceService.getAllInvoices().subscribe((data: any[]) => {
//       this.invoices = data.map((invoice, index) => ({
//         ...invoice,
//         displayId: `INV #${index + 1}`  // Creating a display ID
//       }));
//     }, error => {
//       console.error('Failed to fetch invoices:', error);
//     });

//     // Listen for changes on the invoiceId control
//     this.paymentForm.get('invoiceId')?.valueChanges.subscribe(invoiceId => {
//       if (invoiceId) {
//         this.fetchDueAmount(invoiceId);
//       }
//     });
//   }

//   fetchInvoices(): void {
   
//   }

//   fetchDueAmount(invoiceId: string): void {
//     this.http.get(`/invoices/${invoiceId}`).subscribe(
//       (data: any) => {
//         console.log('Fetched data:', data);
//         this.dueAmount = data.due;
//         this.totalInvoiced = data.totalInvoiced;
//         console.log('Due amount:', this.dueAmount);
//         this.paymentForm.patchValue({
//           amount: this.dueAmount // Optionally pre-fill the amount
//         });
       
//       },
//       error => {
//         console.error('Failed to fetch invoice due amount:', error);
//       }
//     );
//   }

//   onSubmit(): void {
//     if (this.paymentForm.valid) {
//       this.paymentService.addPayment(this.paymentForm.value).subscribe({
//         next: (response) => {
//           console.log('Payment processed successfully', response);
         
//           alert('Payment added successfully!');
//           this.dialogRef.close();
//           this.router.navigate(['/invoice'])
//         },
//         error: (error) => {
//           console.error('Error adding payment', error);
//           alert('Error adding payment!');
//         }
//       });
//     }
//   else {
//     console.log('Payment form is not valid:', this.paymentForm.errors); 
//   }
    
//   }
//   closeDialog(): void {
//     this.dialogRef.close(); // Method to close the dialog
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.services'; // Adjust path as needed
import { PaymentService } from '../../services/payment.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html'
})
export class AddPaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  invoices: any[] = [];
  dueAmount: number = 0;
  totalInvoiced: number = 0;

  constructor(
    private fb: FormBuilder, 
    private invoiceService: InvoiceService, 
    private paymentService: PaymentService,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<AddPaymentComponent>
  ) { }

  ngOnInit(): void {
    this.fetchInvoices();
    this.paymentForm = this.fb.group({
      invoiceId: [null, Validators.required],
      paymentMethod: ['', Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      note: ['']
    });

    // Fetch all invoices
    this.invoiceService.getAllInvoices().subscribe((data: any[]) => {
      this.invoices = data.map((invoice, index) => ({
        ...invoice,
        displayId: `INV #${index + 1}`  // Creating a display ID
      }));
    }, error => {
      console.error('Failed to fetch invoices:', error);
    });

    // Listen for changes on the invoiceId control
    this.paymentForm.get('invoiceId')?.valueChanges.subscribe(invoiceId => {
      if (invoiceId) {
        this.fetchDueAmount(invoiceId);
      }
    });
  }

  fetchInvoices(): void {
    // Fetch invoices logic here
  }

  fetchDueAmount(invoiceId: string): void {
    this.http.get(`/invoices/${invoiceId}`).subscribe(
      (data: any) => {
        console.log('Fetched data:', data);
        this.dueAmount = data.due;
        this.totalInvoiced = data.totalInvoiced;
        console.log('Due amount:', this.dueAmount);
        this.paymentForm.patchValue({
          amount: this.dueAmount // Optionally pre-fill the amount
        });
      },
      error => {
        console.error('Failed to fetch invoice due amount:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.paymentService.addPayment(this.paymentForm.value).subscribe({
        next: (response) => {
          console.log('Payment processed successfully', response);
          alert('Payment added successfully!');
          this.dialogRef.close();
          this.router.navigate(['/invoice'])
        },
        error: (error) => {
          console.error('Error adding payment', error);
          alert('Error adding payment!');
        }
      });
    } else {
      console.log('Payment form is not valid:', this.paymentForm.errors); 
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Method to close the dialog
  }
}




