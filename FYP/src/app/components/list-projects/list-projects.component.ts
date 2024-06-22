// // import { Component, OnInit } from '@angular/core';
// // import { JiraService } from '../services/jira.service';

// // @Component({
// //   selector: 'app-list-projects',
// //   templateUrl: './list-projects.component.html',
// //   styleUrls: ['./list-projects.component.css']
// // })
// // export class ListProjectsComponent implements OnInit {
// //   projects: any[] = [];

// //   constructor(private jiraService: JiraService) { }

// //   ngOnInit(): void {
// //     this.jiraService.getProjects().subscribe({
// //       next: (projects) => this.projects = projects,
// //       error: (error) => console.error(error)
// //     });
// //   }
// // }
// // import { Component, OnInit } from '@angular/core';
// // import { JiraService } from '../services/jira.service';

// // @Component({
// //   selector: 'app-list-projects',
// //   templateUrl: './list-projects.component.html',
// //   styleUrls: ['./list-projects.component.css']
// // })
// // export class ListProjectsComponent implements OnInit {
// //   detailedProjects: any[] = [];

// //   constructor(private jiraService: JiraService) { }

// //   ngOnInit(): void {
// //     this.jiraService.getAllProjectDetails().subscribe({
// //       next: (projects) => this.detailedProjects = projects.map(project => ({
// //         id: project.id, // ID of the project
// //         name: project.name, // Name of the project
// //         key: project.key, // Key of the project
// //         progress: project.progress // Assuming backend sends this
// //         // Add more properties if needed
// //       })),
// //       error: (error) => console.error(error)
// //     });
// //   }
  
// // }

// import { Component, OnInit } from '@angular/core';
// import { JiraService } from '../services/jira.service';

// @Component({
//   selector: 'app-list-projects',
//   templateUrl: './list-projects.component.html',
//   styleUrls: ['./list-projects.component.css']
// })
// export class ListProjectsComponent implements OnInit {
//   detailedProjects: any[] = [];

//   constructor(private jiraService: JiraService) { }

//   ngOnInit(): void {
//     this.jiraService.getAllProjectDetails().subscribe({
//       next: (projects) => this.detailedProjects = projects,
//       error: (error) => console.error(error)
//     });
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { JiraService } from '../services/jira.service';

// @Component({
//   selector: 'app-list-projects',
//   templateUrl: './list-projects.component.html',
//   styleUrls: ['./list-projects.component.css']
// })
// export class ListProjectsComponent implements OnInit {
//   detailedProjects: any[] = [];
//   categorizedTasks: any = {};

//   constructor(private jiraService: JiraService) { }

//   ngOnInit(): void {
//     this.jiraService.getAllProjectDetails().subscribe({
//       next: (projects) => {
//         this.detailedProjects = projects;
//         // Optionally load categorized tasks for the first project as an example
//         if (projects.length > 0) {
//           this.loadCategorizedTasks(projects[0].id);
//         }
//       },
//       error: (error) => console.error(error)
//     });
//   }

//   loadCategorizedTasks(projectId: string): void {
//     this.jiraService.getCategorizedTasksByProject(projectId).subscribe({
//       next: (data) => {
//         this.categorizedTasks[projectId] = data;
//       },
//       error: (error) => console.error(error),
//     });
//   }
//   objectKeys(obj: any): string[] {
//     return Object.keys(obj);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { JiraService } from '../services/jira.service';
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-list-projects',
//   templateUrl: './list-projects.component.html',
//   styleUrls: ['./list-projects.component.css']
// })
// export class ListProjectsComponent implements OnInit {
//   detailedProjects: any[] = [];
//   categorizedTasks: any = {}; // Object to hold categorized tasks keyed by project ID

//   constructor(private jiraService: JiraService) { }

//   ngOnInit(): void {
//     this.jiraService.getAllProjectDetails().subscribe({
//       next: (projects) => {
//         this.detailedProjects = projects;
//         // Load progress data for each project
//         projects.forEach(project => {
//           if (project.id) {
//             this.loadProgressData(project.id);
//           } else {
//             console.error('Project id is undefined:', project);
//           }
//         });
//       },
//       error: (error) => console.error(error)
//     });
//   }


//   loadCategorizedTasks(projectId: string): void {
//         this.jiraService.getCategorizedTasksByProject(projectId).subscribe({
//           next: (data) => {
//             this.categorizedTasks[projectId] = data;
//           },
//           error: (error) => console.error(error),
//         });
//       }



//   loadProgressData(projectId: string): void {
//     this.jiraService.getProjectProgress(projectId).subscribe({
//       next: (progressData) => {
//         this.renderProgressChart(projectId, progressData);
//       },
//       error: (error) => console.error(error),
//     });
//   }

//   renderProgressChart(projectId: string, progressData: any): void {
//     const canvasId = `progressChart-${projectId}`;
//     const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

//     new Chart(ctx, {
//       type: 'doughnut',
//       data: {
//         labels: ['Completed', 'Remaining'],
//         datasets: [{
//           data: [progressData.completedIssues, progressData.totalIssues - progressData.completedIssues],
//           backgroundColor: ['#36A2EB', '#FFCE56'],
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           title: {
//             display: true,
//             text: 'Progress'
//           }
//         }
//       }
//     });
//   }

//   objectKeys(obj: any): string[] {
//     return Object.keys(obj);
//   }
// }

import { Component, OnInit} from '@angular/core';
import { JiraService } from '../../services/jira.service';
import { Chart, registerables } from 'chart.js';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


Chart.register(...registerables);

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {
  detailedProjects: any[] = [];
  mobileMenu = true;
  categorizedTasks: any = {}; // Object to hold categorized tasks keyed by project ID

  constructor(private jiraService: JiraService,private dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.jiraService.getAllProjectDetails().subscribe({
      next: (projects) => {
        this.detailedProjects = projects;
        // Load progress data and categorized tasks for each project
        projects.forEach(project => {
          if (project.id) {
            this.loadProgressData(project.id);
            this.loadCategorizedTasks(project.id);
          } else {
            console.error('Project id is undefined:', project);
          }
        });
      },
      error: (error) => console.error(error)
    });
  }

  loadCategorizedTasks(projectId: string): void {
    this.jiraService.getCategorizedTasksByProject(projectId).subscribe({
      next: (data) => {
        this.categorizedTasks[projectId] = data;
      },
      error: (error) => console.error(error),
    });
  }

  loadProgressData(projectId: string): void {
    this.jiraService.getProjectProgress(projectId).subscribe({
      next: (progressData) => {
        console.log(`Progress data for project ${projectId}:`, progressData);
        this.renderProgressChart(projectId, progressData);
      },
      error: (error) => console.error(error),
    });
  }


  openPopup() {
    this.dialog.open(CreateIssueComponent, {
      width: '60%',
      height: ''
    }).afterClosed().subscribe(val => {
      console.log("submitted");
      this.router.navigate(['/list-tasks']);
    });
  }
  

  renderProgressChart(projectId: string, progressData: any): void {
    const canvasId = `progressChart-${projectId}`;
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
  
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [progressData.completedIssues, progressData.totalIssues - progressData.completedIssues],
            backgroundColor: ['#36A2EB', '#FFCE56'], // Ensure these colors are correctly set
            borderColor: ['#36A2EB', '#FFCE56'], // Optional: border colors
            hoverBackgroundColor: ['#36A2EB', '#ec4b53'], // Optional: hover colors
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Progress'
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const dataset = tooltipItem.dataset;
                  const currentValue = dataset.data[tooltipItem.dataIndex];
                  const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                  const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                  return currentValue + ' (' + percentage + '%)';
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Canvas context not found:', canvasId);
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
