// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { DatePipe } from '@angular/common';
// import { Client } from '../../models/client.model';
// import { ClientService } from 'src/app/services/client.service';
// import { Router } from '@angular/router';
// import { ProjectService } from 'src/app/services/project.service';
// import {
//   Chart,
//   initTE,
// } from "tw-elements";

// @Component({
//   selector: 'app-client',
//   templateUrl: './client.component.html',
//   styleUrls: ['./client.component.css']
// })
// export class ClientComponent implements OnInit {
 
//   projects: any[] = [];
//    clients:Client[] = [
   
//   ];
//   mobileMenu = true; 
//   myDate:any = new Date();
//   ClientList:any;

// constructor(private datePipe: DatePipe ,private clientservice:ClientService,private router:Router ,private projectservice:ProjectService){   setInterval(() => {
//   this.myDate =  new Date();
//   this.myDate = this.datePipe.transform(this.myDate, 'MMM d,  h:mm a');
// }, 1000)

// }

//    ngOnInit(): void {
    
//     initTE({ Chart });
//     this.clientservice.getAllClients().subscribe({
//       next:(clients)=>{
//         console.log(clients);
//         this.clients=clients;
//       },
//       error:(response)=>{
//         console.log(response);
//       }
//     });

//     // When page is initiaized then following function would be called
 
//   }
//   deleteClient(id:string){
//     this.clientservice.DeleteClient(id).subscribe({
//       next:(response)=>{
//     this.router.navigate(['client']);
//       }
//     });
//   }
  
 
// }



export function isProjectDetail(project: string | ProjectDetail): project is ProjectDetail {
  return (project as ProjectDetail).projectName !== undefined;
}



import { ProjectDetail } from 'src/app/models/project-detail.model';
import { InvoiceDetail } from 'src/app/models/invoice-detail.model';
import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Client } from '../../models/Client.model';
// import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.services';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input() project: any;
  projects: any[] = [];
  clients: Client[] = [];
  mobileMenu = true; 
  searchTerm: string = '';
  filteredProjects: any[] = [];
  totalInvoices: number = 0;
  totalPayments: number = 0;
  totalDue: number = 0;
  myDate: any = new Date();
  isLoadingProjects: boolean = false;
  currentUserName!: string;
  // isLoadingClients: boolean = false;
  errorMessage: string = '';
  invoices: (InvoiceDetail & { formattedId: string })[] = []; 
  public isDropdownOpen = false;

  constructor(
    private datePipe: DatePipe,
    // private clientService: ClientService,
    private router: Router,
    private projectService: ProjectService,
    private authService:AuthService,
    private invoiceService: InvoiceService
  ) {
    // setInterval(() => {
    //   this.myDate = new Date();
    //   this.myDate = this.datePipe.transform(this.myDate, 'MMM d, h:mm a');
    // }, 1000)
  }

  ngOnInit(): void {
    // this.fetchClients();
    this.fetchProjects();
    this.loadProjects();
    const currentUser = this.authService.currentUserValue;
    console.log('Current User:', currentUser);
    if (currentUser && currentUser.fname && currentUser.lname)
      
       {
      this.currentUserName = `${currentUser.fname} ${currentUser.lname}`;
    } else {
      this.currentUserName = 'Guest';
    }
    this.fetchInvoices();
    
   
  }

  fetchInvoices(): void {
    this.invoiceService.getInvoicesForClient().subscribe(
      data => {
        this.invoices = data.map((invoice, index) => {
          if (isProjectDetail(invoice.project)) {
            return {
              ...invoice,
              formattedId: `INV #${index + 1}`
            };
          } else {
            console.warn('Invoice lacks detail:', invoice);
            return null;
          }
        }).filter(invoice => invoice !== null) as (InvoiceDetail & { formattedId: string })[];
        console.log('Fetched invoices:', this.invoices);
        this.calculateTotals();
      },
      error => console.error('Error fetching invoices:', error)
    );
  }

  calculateTotals(): void {
    this.totalInvoices = this.invoices.reduce((sum, invoice) => sum + (invoice.totalInvoiced ?? 0), 0);
    this.totalPayments = this.invoices.reduce((sum, invoice) => sum + (invoice.paymentReceived ?? 0), 0);
    this.totalDue = this.invoices.reduce((sum, invoice) => sum + (invoice.due ?? 0), 0);
  }


  
  fetchProjects(): void {
    this.isLoadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoadingProjects = false;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Failed to load projects.';
        this.isLoadingProjects = false;
      }
    });
  }



  loadProjects(): void {
    this.projectService.getsProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        console.log('Projects fetched:', this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  filterProjects(): void {
    if (!this.searchTerm) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login or home page after logout
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  

 }

  // deleteClient(id: string): void {
  //   this.clientService.DeleteClient(id).subscribe({
  //     next: (response) => {
  //       this.router.navigate(['client']);
  //     },
  //     error: (error) => {
  //       console.error('Error deleting client:', error);
  //     }
  //   });
  

