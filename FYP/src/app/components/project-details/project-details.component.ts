import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.loading = true;
    this.projectService.getAllProjectDetails().subscribe({
      next: (data) => {
        console.log('Received project data:', data);
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load project details';
        this.loading = false;
        console.error('Error fetching project details:', error);
      }
    });
  }
}

