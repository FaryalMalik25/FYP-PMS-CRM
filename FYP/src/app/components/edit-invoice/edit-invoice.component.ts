// // edit-invoice.component.ts

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { InvoiceService } from '../services/invoice.services';  
// import { InvoiceDetail } from '../models/invoice-detail.model'; 
// import { Invoice } from '../models/invoice.model'; 
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-edit-invoice',
//   templateUrl: './edit-invoice.component.html',
//   styleUrls: ['./edit-invoice.component.css']
// })
// export class EditInvoiceComponent implements OnInit {
//   invoiceForm!: FormGroup;
//   invoiceId!: string;

//   constructor(
//     private fb: FormBuilder,
//     private invoiceService: InvoiceService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.invoiceId = this.route.snapshot.params['id'];
//     this.initializeForm();
//     if (this.invoiceId) {
//       this.loadInvoiceData();
//     } else {
//       console.error('Invoice ID is undefined upon component initialization.');
//     }
//   }

//   initializeForm(): void {
//     this.invoiceForm = this.fb.group({
//       client: this.fb.group({

//         fname: ['', Validators.required],
//         lname: ['', Validators.required]
//       }),
//       project: this.fb.group({
//         projectName: ['', Validators.required]
//       }),
//       paymentReceived: ['', [Validators.required, Validators.min(1)]],


//     });
//   }

//   loadInvoiceData(): void {
//     if (this.invoiceId) {  
//       this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
//         next: (invoice) => {


//           this.invoiceForm.patchValue(invoice);
//           client: invoice.client;
//           client:invoice._id;
//           project: invoice.project;

//         },
//         error: (error) => console.error('Error fetching invoice:', error)
//       });
//     } else {
//       console.error('Invoice ID is undefined');
//     }
//   }


//   onSubmit(): void {
//     if (this.invoiceForm.valid && this.invoiceId) {  // Check again before submitting
//       console.log("Submitting data:", FormData); // Log the data being sent
//       this.invoiceService.updateInvoice(this.invoiceId, this.invoiceForm.value).subscribe({
//         next: () => {
//           alert('Invoice updated successfully!');
//           this.router.navigate(['/invoices']);
//         },
//         error: (error) => {
//           console.error('Error updating invoice:', error);
//           alert('Failed to update invoice.');
//         }
//       });
//     } else {
//       alert('Invoice ID is missing or form is invalid.');
//     }
//   }
// }


function isClientDetail(client: string | ClientDetail): client is ClientDetail {
  return (client as ClientDetail).fname !== undefined;  
}


function isProjectDetail(project: string | ProjectDetail): project is ProjectDetail {
  return (project as ProjectDetail).projectName !== undefined;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.services';
import { Invoice } from '../../models/invoice.model';
import { ClientDetail } from '../../models/Client-detail.model';
import { InvoiceDetail } from '../../models/invoice-detail.model';
import { ProjectDetail } from '../../models/project-detail.model';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadInvoice();
  }

  initializeForm(): void {
    this.invoiceForm = this.fb.group({
      client: this.fb.group({
        _id: [''], // hold the _id for submission
        fname: ['', Validators.required],
        lname: ['', Validators.required]
      }),
      project: this.fb.group({
        _id: [''], // hold the _id for submission
        projectName: ['', Validators.required]
      }),
      billDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      totalInvoiced: ['', Validators.required],
      paymentReceived: ['', Validators.required],
      due: ['', Validators.required],
      note: ['']
    });
  }

  loadInvoice(): void {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
      next: (invoice) => {
        const localDate = new Date(invoice.billDate).toISOString().substring(0, 10);
        this.invoiceForm.patchValue({
          client: {
            _id: isClientDetail(invoice.client) ? invoice.client._id : '',
            fname: isClientDetail(invoice.client) ? invoice.client.fname : '',
            lname: isClientDetail(invoice.client) ? invoice.client.lname : ''
          },
          project: {
            projectName: isProjectDetail(invoice.project) ? invoice.project.projectName : '',
            _id: isProjectDetail(invoice.project) ? invoice.project._id : ''
          },
          billDate: localDate,
          dueDate: new Date(invoice.dueDate).toISOString().substring(0, 10),
          totalInvoiced: invoice.totalInvoiced,
          paymentReceived: invoice.paymentReceived,
          due: invoice.due,
          note: invoice.note
        });
      },
      error: (error) => console.error('Error fetching invoice:', error)
    });
  }
  

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.getRawValue();
      formData.billDate = new Date(formData.billDate).toISOString();
    formData.dueDate = new Date(formData.dueDate).toISOString();
      // Ensure only the ObjectIds are sent for client and project
      const updatedData = {
        ...formData,
        client: formData.client._id,  
        project: formData.project._id 
      }
      this.invoiceService.updateInvoice(this.invoiceId, updatedData).subscribe({
        next: () => {
          alert('Invoice updated successfully!');
          this.router.navigate(['/invoice']);
        },
        error: (error) => {
          console.error('Error updating invoice:', error);
          alert('Failed to update invoice.');
        }
      });
    }
  }
}
