import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dueAmountSource = new BehaviorSubject<number>(0);
  private invoiceUpdatedSource = new Subject<void>();
  invoiceUpdated$ = this.invoiceUpdatedSource.asObservable();

  currentDueAmount = this.dueAmountSource.asObservable();

  constructor() {}

  updateDueAmount(due: number) {
    this.dueAmountSource.next(due);
  }

  notifyInvoiceUpdated() {
    this.invoiceUpdatedSource.next();
  }

}


