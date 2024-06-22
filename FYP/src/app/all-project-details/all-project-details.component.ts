import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../models/Project.model';

@Component({
  selector: 'app-all-project-details',
  templateUrl: './all-project-details.component.html',
  styleUrls: ['./all-project-details.component.css']
})
export class AllProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    const projectKey = this.route.snapshot.paramMap.get('key');
    if (projectKey) {
      this.fetchProjectDetails(projectKey);
    }
  }

  fetchProjectDetails(key: string): void {
    this.loading = true;
    this.projectService.getProjectByKey(key).subscribe({
      next: (data: Project) => {
        console.log('Received project data:', data); // Log the data
        this.project = data;
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
