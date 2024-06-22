import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { LoginComponent } from './components/login/login.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { InvoiceDetailComponent } from './components/invoice-details/invoice-detail.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientInvoicesComponent } from './components/client-invoices/client-invoices.component';

import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { AllProjectDetailsComponent } from './all-project-details/all-project-details.component';
import { CombinedProjectsComponent } from './combined-projects/combined-projects.component';
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentItemsComponent } from './components/sent-items/sent-items.component';
import { AdminComposeMessageComponent } from './components/admin-compose-message/admin-compose-message.component';
import { AdminInboxComponent } from './components/admin-inbox/admin-inbox.component';
import { AdminSentItemsComponent } from './components/admin-sent-items/admin-sent-items.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AdminMessageComponent } from './components/admin-message/admin-message.component';
import { AuthGuard } from './guards/auths.guard';



const routes: Routes = [

{ path: 'client',canActivate:[AuthGuard] ,component: ClientComponent, title: 'Client Dashboard' },

{path: '', 
component: LoginComponent,
title:'signin' },
{path: 'sign-up', 
component: SignupComponent,
title:'Sign-up' },
{ path: 'admin', component: AdminComponent, title: 'Admin Dashboard' },
{path: 'create-project',
component: CreateProjectComponent,
title:'create-project' },
{path: 'ClientProjects-list',
component: ProjectListComponent,
title:'ClientProjects-list' },

{path: 'confimation', 
component: ConfirmationComponent,
title:'confirm' },

{path: 'login', 
component: LoginComponent,
title:'login' },
{path:'add-invoices',component:AddInvoiceComponent,title:'add-invoices'},
{path:'add-payments',component:AddPaymentComponent,title:'add-paymnets'},
{path:'invoice',component:InvoiceDetailComponent,title:'invoice'},
{path:'edit-invoice/:id',component:EditInvoiceComponent,title:'edit-invoice/:id'},
{path:'client-list',component:ClientListComponent,title:'client-list'},
{ path: 'edit-client/:id' ,component: EditClientComponent },
  { path: '', redirectTo: '/client-list', pathMatch: 'full' },
  { path: 'add-client', component: AddClientComponent },
  { path: '', redirectTo: '/client-list', pathMatch: 'full' },
  { path: 'client-invoices',component: ClientInvoicesComponent, },
  {path:'create-issue',component:CreateIssueComponent,title:'create-issue'},
  {path:'list-tasks',component:ListProjectsComponent},
  {path:'All-Projects',component:CombinedProjectsComponent},

  { path: '', redirectTo: '/messages/inbox', pathMatch: 'full' },
  {
    path: 'messages',canActivate:[AuthGuard], component: MessagesComponent, children: [
      { path: 'compose',canActivate:[AuthGuard], component: ComposeMessageComponent },
      { path: 'inbox',canActivate:[AuthGuard], component: InboxComponent },
      { path: 'sent',canActivate:[AuthGuard], component: SentItemsComponent }
    ]

  },
  { path: '', redirectTo: '/admin/messages/admin/inbox', pathMatch: 'full' },
  {
    path: 'admin/messages',canActivate:[AuthGuard], component: AdminMessageComponent, children: [
      { path: 'admin/compose',canActivate:[AuthGuard], component: AdminComposeMessageComponent },
      { path: 'admin/inbox', canActivate:[AuthGuard],component: AdminInboxComponent },
      { path: 'admin/sent', canActivate:[AuthGuard],component: AdminSentItemsComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
