// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { InvoiceService } from '../../services/invoice.services';
// import { ClientService } from '../../services/Client.service'; // Assuming you have a service to fetch clients
// import { Invoice } from '../../models/invoice.model';
// import { Client } from '../../models/Client.model'; // Define this model if not already defined
// import { ProjectService } from '../../services/project.service';
// import { Project } from 'src/app/models/Project.model';
// import { ChangeDetectorRef } from '@angular/core';

// @Component({
//   selector: 'app-add-invoice',
//   templateUrl: './add-invoice.component.html',
//   styleUrls: ['./add-invoice.component.css']
// })
// export class AddInvoiceComponent implements OnInit {
//   clients: Client[] = [];
//   projects: any[] = [];
//   selectedClient: string;



//   constructor(private invoiceService: InvoiceService, private clientService: ClientService,private ProjectService:ProjectService,private cdr: ChangeDetectorRef) { }

//   ngOnInit() {
//     this.clientService.getClients().subscribe({
//       next: (data: Client[]) => {
//         this.clients = data; // Assign fetched clients to the clients property
//       },
//       error: (error: any) => console.error('Error fetching clients:', error)
//     });

//   }







//   onSubmit(form: NgForm) {
//     if (form.invalid || !this.selectedProject) return;

//     const newInvoice: Invoice = {
//       billDate: form.value.billDate,
//       dueDate: form.value.dueDate,
//       client: form.value.client,
//       project: form.value.projectName,
//       // totalInvoiced: this.selectedProject.price,
//       paymentReceived: form.value.paymentReceived,
//       status: form.value.status,
//       note: form.value.note,
//       labels: form.value.labels.split(',')
//     };

//     this.invoiceService.addInvoice(newInvoice).subscribe({
//       next: (invoice) => console.log('Invoice added:', invoice),
//       error: (error) => console.error('Error adding invoice:', error)
//     })
//   }
// }



import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.services';
import { ClientService } from 'src/app/services/Client.service';
import { ProjectService } from '../../services/project.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Invoice } from '../../models/invoice.model';
import { Client } from '../../models/Client.model';
import { Project } from 'src/app/models/Project.model';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  formValue!: FormGroup;
  clients: Client[] = [];
  projects: Project[] = [];
  invoices: Invoice[] = [];
 
  selectedClient?: Client;
  selectedProject?: Project;

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private router: Router,
    private dialogRef: MatDialogRef<AddInvoiceComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {


    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.cdr.detectChanges(); // Ensure UI is updated
      },
      error: (error: any) => console.error('Error fetching clients:', error)
    });



  }

  onClientSelect(client: Client): void {
    if (client && client._id) {
      this.projectService.getProjectsByClientId(client._id).subscribe({
        next: (projects: Project[]) => {
          this.projects = projects;
          this.cdr.detectChanges();  // Force update to the view if necessary
        },
        error: (error: any) => {
          console.error('Error fetching projects:', error);
          this.projects = []; // Clear previous projects on error to avoid inconsistent state
        }

      });
    } else {
      this.projects = []; // Clear projects if no valid client is selected
    }



  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.selectedClient || !this.selectedProject) return;

    const newInvoice: Invoice = {
      billDate: form.value.billDate,
      dueDate: form.value.dueDate,
      client: this.selectedClient._id,
      project: this.selectedProject._id,
      totalInvoiced: this.selectedProject.price,
      note: form.value.note,
      status: 'Not Paid', // Default status upon invoice creation
      payments: [] // Initialize with empty payments array
    };


    this.invoiceService.addInvoice(newInvoice).subscribe({
      next: (invoice) => {
        console.log('Invoice added:', invoice);
         this.dialogRef.close();
        this.router.navigate(['/invoice']);
      },
      error: (error) => {
        console.error('Error adding invoice:', error);
      }
    

    });
    // console.log('Submitting Invoice:', newInvoice);

  }

  get totalInvoiced(): number {
    return this.selectedProject ? this.selectedProject.price : 0;
  }

  set totalInvoiced(value: number) {
    if (this.selectedProject) {
      this.selectedProject.price = value;
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Method to close the dialog
  }
}











