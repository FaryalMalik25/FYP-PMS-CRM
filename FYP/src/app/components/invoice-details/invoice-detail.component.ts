
function isClientDetail(client: string | ClientDetail): client is ClientDetail {
  return (client as ClientDetail).fname !== undefined;
}

function isProjectDetail(project: string | ProjectDetail): project is ProjectDetail {
  return (project as ProjectDetail).projectName !== undefined;
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.services';
import { Invoice } from '../../models/invoice.model';
import { ClientDetail } from '../../models/Client-detail.model';
import { InvoiceDetail } from '../../models/invoice-detail.model';
import { ProjectDetail } from '../../models/project-detail.model';
import { Router , NavigationEnd} from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { SharedDataService } from '../../services/shared-data.service';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
})



export class InvoiceDetailComponent implements OnInit {
  // invoices: Invoice[] = [];
  invoices: InvoiceDetail[] = [];
  invoice!: Invoice;
  totalInvoiced: number = 0;
  totalPaymentReceived: number = 0;
  totalDue: number = 0;
  mobileMenu = true; 


  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private sharedDataService: SharedDataService
   
  ) {  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.fetchInvoices(); // Fetch data on navigation end
    }
  });}

  openPopup(){
    this.dialog.open(AddInvoiceComponent,{
      width:'60%',
      height:''
    }).afterClosed().subscribe(val=>{
      console.log("submites");
      
  this.router.navigate(['/invoice']);
      
    })
  }

  openPopup2(){
    this.dialog.open(AddPaymentComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
   
      this.router.navigate(['/invoice']).then(success => {
        if (success) {
          console.log('Navigation to /invoice successful');
        } else {
          console.log('Navigation to /invoice failed');
        }
      });
    });
  }



  ngOnInit(): void {
    
    
    this.fetchInvoices();

  }

  fetchInvoices(): void {

    this.invoiceService.getInvoices().subscribe(
      data => {
        this.invoices = data.map((invoice, index) => {
          if (isClientDetail(invoice.client) && isProjectDetail(invoice.project)) {
            return {
              ...invoice as InvoiceDetail,
              displayId: `INV #${index + 1}`
            };
          } else {
            console.warn('Invoice lacks detail:', invoice);
            return null;
          }
        }).filter(invoice => invoice !== null) as InvoiceDetail[];
        this.calculateTotals();
        console.log('Fetched invoices:', this.invoices);
      },
      error => console.error('Error fetching invoices:', error)
    );

    
  }




  
  

  isDetailedInvoice(invoice: any): boolean {
    return this.isClientDetail(invoice.client) && this.isProjectDetail(invoice.project);
  }
  isClientDetail(client: any): client is ClientDetail {
    return (client as ClientDetail).fname !== undefined;
  }

  isProjectDetail(project: any): project is ProjectDetail {
    return (project as ProjectDetail).projectName !== undefined;
  }


  deleteInvoice(id: string | undefined) {
    if (!id) {
      console.error('Attempted to delete an invoice without an ID');
      return;
    }

    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(invoice => invoice._id !== id);
          alert('Invoice deleted successfully!');
        },
        error: error => console.error('Error deleting invoice:', error)
      });
    }
  }

  editInvoice(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/edit-invoice', id]);
    } else {
      console.error('No ID provided for editing the invoice');
      
    }
  }
  



  goBack(): void {
    window.history.back();
  }


  calculateTotals(): void {
    this.totalInvoiced = this.invoices.reduce((sum, invoice) => sum + (invoice.totalInvoiced || 0), 0);
    this.totalPaymentReceived = this.invoices.reduce((sum, invoice) => sum + (invoice.paymentReceived || 0), 0);
    this.totalDue = this.invoices.reduce((sum, invoice) => sum + (invoice.due || 0), 0);
    this.sharedDataService.updateDueAmount(this.totalDue);
  }


  
}
