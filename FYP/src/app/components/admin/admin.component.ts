import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { InvoiceService } from 'src/app/services/invoice.services';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  currentUserName!: string;
  invoiceCount: number = 0;
  totalInvoices: number = 0;
  totalPayments: number = 0;
  due: number = 0;
  clockedIn: boolean = false;
  startTime: any;
  endTime: any;
  totalHours: any;
  mobileMenu = true; 
  myDate:any = new Date();
  public isDropdownOpen = false;
  ClientList:any;
  totalDue: number = 0;
  projectCount: number = 0;
  

constructor(private datePipe: DatePipe,private projectService: ProjectService, private invoiceService: InvoiceService,private sharedDataService: SharedDataService, private authService:AuthService,private router:Router){   setInterval(() => {
  this.myDate =  new Date();
  this.myDate = this.datePipe.transform(this.myDate, 'MMM d,  h:mm a');
}, 1000)

}

   ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('Current User:', currentUser);
    if (currentUser && currentUser.fname && currentUser.lname)
      
       {
      this.currentUserName = `${currentUser.fname} ${currentUser.lname}`;
    } else {
      this.currentUserName = 'Guest';
    }
    this.sharedDataService.currentDueAmount.subscribe(due => {
      this.totalDue = due;
    });
    this.projectService.getProjectCount().subscribe(data => {
      this.projectCount = data.count;
    }, error => {
      console.error('Error fetching project count:', error);
    });

    this.invoiceService.getInvoiceCount().subscribe(data => {
      this.invoiceCount = data.count;
    }, error => {
      console.error('Error fetching invoice count:', error);
    });
  
  
    this.invoiceService.getTotalInvoicesAndPayments().subscribe(totals => {
      this.totalInvoices = totals.totalInvoices;
      this.totalPayments = totals.totalPayments;
      this.due=totals.due
    });

    
   
  }





  clockIn() {
    this.clockedIn = true;
    this.startTime = new Date();
    console.log("clockin");
  }

  clockOut() {
    if (this.clockedIn) {
      this.endTime = new Date();
      this.calculateTotalHours();
      this.clockedIn = false;
      console.log("clockout");
    }
  }
  

  calculateTotalHours() {
    const seconds = Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    this.totalHours = `${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds`;
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login or home page after logout
  }
}
  


