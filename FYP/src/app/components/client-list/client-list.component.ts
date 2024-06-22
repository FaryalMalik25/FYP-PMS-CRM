import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client-list.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { InvoiceService } from 'src/app/services/invoice.services';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  mobileMenu = true;
  currentUserName!: string;
  // clients: any[] = [];
  clients: (Client & { displayId: number })[] = [];
  filteredClients: (Client & { displayId: number })[] = [];
  searchTerm: string = '';
  totalInvoices: number = 0;
  public isDropdownOpen = false;
  totalPayments: number = 0;
  due: number = 0;
  deleteClientId:any;
  constructor(private userService: UserService,private authService:AuthService, private dialog: MatDialog, private router: Router, private invoiceService: InvoiceService) { }

  ngOnInit(): void {

    const currentUser = this.authService.currentUserValue;
    console.log('Current User:', currentUser);
    if (currentUser && currentUser.fname && currentUser.lname)
      
       {
      this.currentUserName = `${currentUser.fname} ${currentUser.lname}`;
    } else {
      this.currentUserName = 'Guest';
    }
    this.userService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients.map((client: Client, index: number) => ({
        ...client,
        displayId: index + 1
      }));
      this.filteredClients = this.clients;
      console.log('Clients:', this.clients);
    });



    this.invoiceService.getTotalInvoicesAndPayments().subscribe(totals => {
      this.totalInvoices = totals.totalInvoices;
      this.totalPayments = totals.totalPayments;
      this.due=totals.due
    });


  }


  onSearch(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }

  openPopup() {
    this.dialog.open(AddClientComponent, {
      width: '60%',
      height: ''
    }).afterClosed().subscribe(val => {
      console.log("submites");

      this.router.navigate(['/client-list']);

    })
  }

  editClient(id: string): void {
    this.router.navigate(['/edit-client', id]);
  }

  addClient(): void {
    this.router.navigate(['/add-client']);
  }
  deleteClient(id:string){
		this.deleteClientId = id;
		this.dialog.open(ConfirmationComponent,{width:'30%',
			height:'',
			data:{
				heading:'Confirmation',
				message: 'Are you sure you want to delete?',
				  delete: 'Delete',
				  cancel: 'Cancel'
				
			  }
		}).afterClosed().subscribe(val=>{
			if(val == "true"){
				this.deletion();
			}
		})
		
	}
  deletion(){
    this.userService.deleteClient(this.deleteClientId).subscribe(() => {
      this.clients = this.clients.filter(client => client._id !== this.deleteClientId);
      this.onSearch();
    });
  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login or home page after logout
  }
  
  /*
  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.userService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(client => client._id !== id);
        this.onSearch();
      });
    }
  }*/
}

