import { ClientDetail } from '../models/Client-detail.model';
import { ProjectDetail } from '../models/project-detail.model';




export interface PaymentDetail {
  date?: Date;
  amount?: number;
  method?: string;
  note?: string;
}
export interface Invoice {
  _id?: string;
 billDate: Date;
  dueDate: Date;
  client: string | ClientDetail;
  project: string | ProjectDetail; 
  totalInvoiced: number;
  amount?:number;
  due?:number;
  paymentReceived?: number;
  note: string;
  displayNumber?: string;
  status?: string; // Adding status to the interface
  payments?: PaymentDetail[]; // Adding payments details array
}

