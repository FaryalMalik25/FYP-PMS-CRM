# Project Management System and CRM

## Overview
"Project Management System and CRM" is a comprehensive MEAN stack project designed to streamline project management and customer relationship management processes. It features two main user roles: Admin and Client. The system includes secure signup and login using JSON Web Tokens (JWT). Admins have a dashboard to manage clients, projects, tasks, invoices, and payments , with full CRUD operations and integration with JIRA for project and task management and use a messaging app to communicate with  clients . Clients have a personalized dashboard to manage their own projects, invoices, and payments, view project reports from JIRA, and use a messaging app. Projects and tasks created in JIRA are synchronized with the database, and task reports are generated from JIRA. This solution enhances efficiency and organization in handling projects and customer relationships.

## Features
- User Authentication: Secure signup and login using JSON Web Tokens (JWT).
- Admin Dashboard: Comprehensive dashboard for viewing and managing all projects, clients, tasks, invoices, and payments.
- Project Management: Create, manage, and track projects and tasks, with integration to JIRA for synchronization and task reporting.
- Client Management: Full CRUD operations for managing client information.
- Invoice Management: Auto-generated invoices based on project data, with automatic price fetching and payment tracking.
- Messaging System: Built-in messaging app with compose, inbox, and sent items functionalities for both Admin and Client roles.
- Client Dashboard: Personalized dashboard for clients to view and manage their own projects, invoices, payments, and task reports from JIRA.


## Folder Structure
- FYP/
- ├── Backend/
- │ ├── node_modules/
- │ ├── src/
- │ ├── package.json
- │ └── ...
- ├── FYP/
- │ ├── node_modules/
- │ ├── src/
- │ ├── angular.json
- │ └── ...
- ├── README.md
- ├── .gitignore


## Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

## Setup Instructions

### Backend Setup
- 1. **Navigate to the Backend Directory**:
   ```bash
   cd path/to/FYP/Backend


  2. **Install Dependencies**
    npm install

 - 3. **Start the Backend Server**
   npm start


## Frontend Setup
.Open a New Terminal Window (while the backend server is running).
- 1. **Navigate to the Backend Directory**:
   ```bash
   cd path/to/FYP/FYP


  2. **Install Dependencies**
    npm install

 - 3. **Start the Frontend Server**
   npm start


**Running the Project**
- 1.Start the Backend:
Open a terminal and navigate to the Backend directory.
Run npm start to start the backend server.
- 2.Start the Frontend:
Open a new terminal and navigate to the FYP directory.
Run npm start to start the frontend application.

## Technologies Used
- Frontend: Angular,Tailwind
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Project Management: JIRA API for project and task management


## Contribution
Feel free to fork this repository, create issues, and submit pull requests. Any contributions to improve the project are welcome!