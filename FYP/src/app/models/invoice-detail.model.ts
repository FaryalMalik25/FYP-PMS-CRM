import { Invoice } from './invoice.model';
import { ClientDetail } from '../models/Client-detail.model';
import { ProjectDetail } from '../models/project-detail.model';

export interface InvoiceDetail extends Invoice {
  client: ClientDetail;
  project: ProjectDetail;
  displayId?: string;
  paymentReceived?: number;
  billDate: Date;
}