import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Project } from 'src/app/models/Projects.model';
@Component({
  selector: 'app-client-projects',
  templateUrl: './client-projects.component.html',
  styleUrls: ['./client-projects.component.css']
})
export class ClientProjectsComponent implements OnInit {
  deleteProjectId: any;
  mobileMenu = true;
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private projectservice: ProjectService, private dialog: MatDialog, private router: Router) {}

  openPopup() {
    this.dialog.open(CreateProjectComponent, {
      width: '60%',
      height: ''
    }).afterClosed().subscribe(val => {
      console.log("submitted");
      this.router.navigate(['/All-Projects']);
    });
  }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.loading = true;
    this.projectservice.getAllProjectDetails().subscribe({
      next: (data: Project[]) => {
        console.log('Received project data:', data);
        this.projects = data;
        this.filteredProjects = this.groupProjects(data);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load project details';
        this.loading = false;
        console.error('Error fetching project details:', error);
      }
    });
  }

  groupProjects(projects: Project[]): Project[] {
    const groupedProjects = projects.reduce((acc, project) => {
      const existingProject = acc.find(p => p.title === project.title);
      if (!existingProject) {
        acc.push(project);
      }
      return acc;
    }, [] as Project[]);
    return groupedProjects;
  }

  filterProjects(): void {
    if (!this.searchTerm) {
      this.filteredProjects = this.groupProjects(this.projects);
    } else {
      const filtered = this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredProjects = this.groupProjects(filtered);
    }
  }

  viewProjectDetails(project: Project): void {
    console.log('Navigating to project details with project:', project);
    if (project.id) {
      this.router.navigate(['/all-project-details', project.id]); // Navigate to project details page using _id
    } else {
      console.error('Project ID is missing:', project);
    }
  }
}
