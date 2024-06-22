



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { JiraService } from '../../services/jira.service';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
formValue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jiraService: JiraService,private formbuilder:FormBuilder,
    private router:Router,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      issueType: ['', Validators.required],
      summary: ['', Validators.required],
      priority: ['Medium', Validators.required],  
      dueDate: ['', Validators.required], 
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  addProjects(): void {
    if (this.formValue.valid) {
      let formValue = this.formValue.value;
      // Format the provided due date to 'YYYY-MM-DD'
      formValue.dueDate = formatDate(formValue.dueDate, 'yyyy-MM-dd', this.locale);

      this.jiraService.createProjectAndIssues(formValue)
        .subscribe({
          next: response => {
            console.log('Project and issues created successfully:', response);
            this.router.navigate(['/ClientProjects-list']);
          },
          error: error => {
            console.error('Error creating project and issues:', error);
          }
        });
    }
  }
}
