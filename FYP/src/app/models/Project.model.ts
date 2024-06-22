import { Issue } from "./Issue.model";
export interface Project {
    _id: string;
    projectName: string;
    projectKey: string;
    price: number;
    title: string;
   
    progress: number;
    issues: Issue[];
  }


//   export interface Project{
//     id:string;
//     title:string;
//     description:string;
//     startdate:string;
//     deadline:string;
//     price :number;
//     label:string;
// }