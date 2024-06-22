import { Issue } from "./Issue.model";

export interface Project {
  id: string;  // Use id instead of _id
  projectName: string;
  projectKey: string;
  price: number;
  title: string;
  progress: number;
  issues: Issue[];
  // Add other properties if there are any
}
