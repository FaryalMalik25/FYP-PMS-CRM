// create-issue.component.ts
import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { ProjectService } from '../../services/project.service'; // Ensure you have a ProjectService to fetch projects

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  issue = {
    projectName: '', // Ensure this matches the template
    issueType: '',
    summary: '',
    description: '',
    priority: '',
    dueDate: ''
   
  };
  createAnother = false;

  projects: any[] = [];

  constructor(private issueService: IssueService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjectDetails().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => console.error('Error loading projects:', error)
    });
  }

  createIssue(): void {
    this.issueService.createIssue(this.issue).subscribe({
      next: (response) => {
        console.log('Issue created successfully:', response);
        alert('Issue created successfully');
        if (this.createAnother) {
          this.resetForm();
        } else {
          // Navigate away or clear form as required
        }
      },
      error: (error) => console.error('Error creating issue:', error)
    });
  }

  resetForm(): void {
    this.issue = {
      projectName: '',
      issueType: '',
      summary: '',
      description: '',
      priority: '',
      dueDate: ''
    };
    this.createAnother = false; // Reset the checkbox
  }
}
