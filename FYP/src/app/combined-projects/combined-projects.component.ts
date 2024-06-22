import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CreateProjectComponent } from '../components/create-project/create-project.component';
import { JiraService } from '../services/jira.service';


import { Project } from 'src/app/models/Projects.model';

@Component({
  selector: 'app-combined-projects',
  templateUrl: './combined-projects.component.html',
  styleUrls: ['./combined-projects.component.css']
})
export class CombinedProjectsComponent implements OnInit {
  deleteProjectId: any;
  mobileMenu = true;
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  errorMessage: string = '';




  


  constructor(private projectService: ProjectService, private dialog: MatDialog, private router: Router,private jiraService: JiraService) {}
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
    this.projectService.getAllProjectDetails().subscribe({
      next: (data) => {
        console.log('Received project data:', data);
        this.projects = data;
        this.filteredProjects = this.projects.filter(
          (v, i, a) => a.findIndex(t => (t.title === v.title)) === i
        );
        this.projects.forEach(project => this.fetchProjectProgress(project.id));
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load project details';
        this.loading = false;
        console.error('Error fetching project details:', error);
      }
    });
  }

 

  

  fetchProjectProgress(projectId: string): void {
    this.jiraService.getProjectProgress(projectId).subscribe({
      next: (progressData) => {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
          project.progress = progressData.progress;
        }
      },
      error: (error) => {
        console.error('Error fetching progress data:', error);
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
}
