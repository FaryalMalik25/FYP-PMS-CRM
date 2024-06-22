// import { Component, OnInit,Input } from '@angular/core';
// import { ProjectService } from 'src/app/services/project.service';
// import { MatDialog } from '@angular/material/dialog';
// import { CreateProjectComponent } from '../create-project/create-project.component';
// import { Router } from '@angular/router';
// import { ConfirmationComponent } from '../confirmation/confirmation.component';
// import { AuthService } from 'src/app/services/auth.service';
// @Component({
//   selector: 'app-project-list',
//   templateUrl: './project-list.component.html',
//   styleUrls: ['./project-list.component.css']
// })
// export class ProjectListComponent implements OnInit {
//   @Input() project: any;
//   deleteProjectId:any;
//   mobileMenu = true; 
//   projects: any[] = [];
//   filteredProjects: any[] = [];
//   searchTerm: string = ''; 
//   constructor(private projectservice: ProjectService,private authService:AuthService,private dialog: MatDialog,private router:Router){

//   }
//   openPopup(){
//     this.dialog.open(CreateProjectComponent,{
//       width:'60%',
//       height:''
//     }).afterClosed().subscribe(val=>{
      
//       console.log("submites");
      
//   this.router.navigate(['/ClientProjects-list']);
      
//     })
//   }
// ngOnInit(): void {
//   this.loadProjects();
//   // this.projectservice.getAllProjects().subscribe({
//   //   next:(projects)=>{
//   //     console.log(projects);
//   //     this.projects=projects;
//   //   },
//   //   error:(response)=>{
//   //     console.log(response);
//   //   }
//   // });
//   this.filterProjects();
 
// }
// loadProjects(): void {
//   this.projectservice.getProjects().subscribe({
//     next: (data) => {
//       this.projects = data;
//       this.filteredProjects = data;
//       console.log('Projects fetched:', this.projects);
//     },
//     error: (err) => {
//       console.error('Error fetching projects:', err);
//     }
//   });
// }
// logoutUser(): void {
//   this.authService.logout();
//   // Optionally, redirect the user or perform other cleanup tasks here
// }


// filterProjects(): void {
//   if (!this.searchTerm) {
//     this.filteredProjects = [...this.projects];
//   } else {
//     this.filteredProjects = this.projects.filter(project =>
//       project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }
// formatPrice(price: number): string {
//   return price.toLocaleString('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   });
// }


// deleteProject(id:string){
//   this.deleteProjectId = id;
//   this.dialog.open(ConfirmationComponent,{width:'30%',
//     height:'',
//     data:{
//       heading:'Confirmation',
//       message: 'Are you sure you want to delete Project?',
//         delete: 'Delete',
//         cancel: 'Cancel'
      
//       }
//   }).afterClosed().subscribe(val=>{
//     if(val == "true"){
//       this.deletion();
//     }
//   })
  
// }
// deletion(){
		
//   this.projectservice.DeleteProject(this.deleteProjectId).subscribe({
//     next:(response)=>{
//   this.router.navigate(['/project-list']);
//     }
//   });
// }
// }

// project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchTerm: string = '';
  mobileMenu = true; 
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getsProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        console.log('Projects fetched:', this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  filterProjects(): void {
    if (!this.searchTerm) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openPopup(): void {
    this.dialog.open(CreateProjectComponent, {
      width: '60%',
    }).afterClosed().subscribe(val => {
      if (val) {
        this.loadProjects();
      }
    });
  }

  logoutUser(): void {
    this.authService.logout();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

 

  


}
