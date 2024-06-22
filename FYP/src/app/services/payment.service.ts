// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments';

  constructor(private http: HttpClient) { }

  addPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, paymentData);
   
  }

  addPayments(invoiceId: string, payment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${invoiceId}/payments`, payment);
  }
}
export interface Payment {
    invoiceId:string;
    paymentMethod: string;
    paymentDate: Date;
    amount:Number;
    note:string;
  }

  