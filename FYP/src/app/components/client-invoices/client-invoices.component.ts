export function isProjectDetail(project: string | ProjectDetail): project is ProjectDetail {
  return (project as ProjectDetail).projectName !== undefined;
}
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.services';
import { Invoice } from 'src/app/models/invoice.model';
import { ProjectDetail } from 'src/app/models/project-detail.model';
import { InvoiceDetail } from 'src/app/models/invoice-detail.model';


@Component({
  selector: 'app-client-invoices',
  templateUrl: './client-invoices.component.html',
  styleUrls: ['./client-invoices.component.css']
})
export class ClientInvoicesComponent implements OnInit {
  invoices: (InvoiceDetail & { formattedId: string })[] = []; 
  mobileMenu = true;
  totalInvoices: number = 0;
  totalPayments: number = 0;
  totalDue: number = 0;
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
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


}