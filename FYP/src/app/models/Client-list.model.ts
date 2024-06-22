export interface Client {
    _id: string;
    email: string;
    fname: string;
    lname: string;
    name:string;
   totalInvoiced?: number;
    paymentReceived?: number;
    due?: number;
    projects?: number;
  }
  