import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { InvoiceDetail } from '../models/invoice-detail.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/invoices';



  constructor(private http: HttpClient,private authService:AuthService) { }

 

 
 
  getTotalInvoicesAndPayments(): Observable<{ totalInvoices: number, totalPayments: number ,due:number}> {
    return this.http.get<{ totalInvoices: number, totalPayments: number ,due:number}>(`${this.apiUrl}/totals`);
  }

 
  addInvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<Invoice>(this.apiUrl, invoice, { headers });
  }

  getInvoiceCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count`);
  }
 


  private getToken(): string {

    return localStorage.getItem('token') || '';
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  

  deleteInvoice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updateInvoice(id: string, invoiceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, invoiceData);
  }


  getAllInvoices(): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(this.apiUrl);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  


  getInvoicesForClient(): Observable<InvoiceDetail[]> {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<InvoiceDetail[]>(`${this.apiUrl}/client/${currentUser._id}`, { headers });
  }


}










