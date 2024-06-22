// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {HttpClientModule} from '@angular/common/http'
// import { AuthService } from './services/auth.service';
// import { ClientComponent } from './components/client/client.component';
// import { DatePipe } from '@angular/common';
// import { SignupComponent } from './components/signup/signup.component';
// import { AdminComponent } from './components/admin/admin.component';
// import { CreateProjectComponent } from './components/create-project/create-project.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatPaginatorModule} from '@angular/material/paginator';
// import { MatSortModule} from '@angular/material/sort';
// import { MatTableModule} from '@angular/material/table';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { ProjectListComponent } from './components/project-list/project-list.component';

// import { ConfirmationComponent } from './components/confirmation/confirmation.component';
// import { ClientProjectsComponent } from './components/client-projects/client-projects.component';
// import { LoginComponent } from './components/login/login.component';
// import { ProjectDetailsComponent } from './components/project-details/project-details.component';
// import { ProjectsComponent } from './components/projects/projects.component';
// import { AuthInterceptor } from './auth.interceptor';
// import { ProjectService } from './services/project.service';
// import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
// import { AddPaymentComponent } from './components/add-payment/add-payment.component';
// import { InvoiceDetailComponent } from './components/invoice-details/invoice-detail.component';
// import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
// import { ClientListComponent } from './components/client-list/client-list.component';
// import { EditClientComponent } from './components/edit-client/edit-client.component';
// import { AddClientComponent } from './components/add-client/add-client.component';
// import { ClientInvoicesComponent } from './components/client-invoices/client-invoices.component';
// import { CreateIssueComponent } from './components/create-issue/create-issue.component';
// import { ListProjectsComponent } from './components/list-projects/list-projects.component';
// import { RouterModule } from '@angular/router';

// @NgModule({
//   declarations: [
//     AppComponent,
//     ClientComponent,
//     SignupComponent,
//     AdminComponent,
//     CreateProjectComponent,
//     ProjectListComponent,
//     ConfirmationComponent,
//     ClientProjectsComponent,
//     LoginComponent,
//     ProjectDetailsComponent,
//     ProjectsComponent,
//     AddInvoiceComponent,
//     AddPaymentComponent,
//     InvoiceDetailComponent,
//     EditInvoiceComponent,
//     ClientListComponent,
//     EditClientComponent,
//     AddClientComponent,
//     ClientInvoicesComponent,
//     CreateIssueComponent,
//     ListProjectsComponent,
//     RouterModule,
    

//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     FormsModule,
//     BrowserAnimationsModule,
//     MatDialogModule,
//     MatSlideToggleModule,
//     MatFormFieldModule,
//     MatInputModule, 
//     MatTableModule,
//     MatSortModule,
//     MatPaginatorModule,
//     HttpClientModule,
    
//   ],
//   providers: [DatePipe,ProjectService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthService],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { AuthInterceptor } from './auth.interceptor';

import { ClientComponent } from './components/client/client.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ClientProjectsComponent } from './components/client-projects/client-projects.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { InvoiceDetailComponent } from './components/invoice-details/invoice-detail.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientInvoicesComponent } from './components/client-invoices/client-invoices.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { RouterModule } from '@angular/router';
import { AllProjectDetailsComponent } from './all-project-details/all-project-details.component';
import { CombinedProjectsComponent } from './combined-projects/combined-projects.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentItemsComponent } from './components/sent-items/sent-items.component';
import { AdminComposeMessageComponent } from './components/admin-compose-message/admin-compose-message.component';
import { AdminInboxComponent } from './components/admin-inbox/admin-inbox.component';
import { AdminSentItemsComponent } from './components/admin-sent-items/admin-sent-items.component';

import { MessagesComponent } from './components/messages/messages.component';
import { AdminMessageComponent } from './components/admin-message/admin-message.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    SignupComponent,
    AdminComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ConfirmationComponent,
    ClientProjectsComponent,
    LoginComponent,
    ProjectDetailsComponent,
  
    AddInvoiceComponent,
    AddPaymentComponent,
    InvoiceDetailComponent,
    EditInvoiceComponent,
    ClientListComponent,
    EditClientComponent,
    AddClientComponent,
    ClientInvoicesComponent,
    CreateIssueComponent,
    ListProjectsComponent,
    AllProjectDetailsComponent,
    CombinedProjectsComponent,
    ComposeMessageComponent,
    InboxComponent,
    SentItemsComponent,
    AdminComposeMessageComponent,
    AdminInboxComponent,
    AdminSentItemsComponent,
   
    MessagesComponent,
    AdminMessageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    NgChartsModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    DatePipe,
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
