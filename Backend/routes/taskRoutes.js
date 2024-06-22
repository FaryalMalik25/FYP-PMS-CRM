
const express = require('express');
const router = express.Router();
const jiraService = require('../services/jiraService');
const createProject = require('../create-project');
const createIssue = require('../create-issue');
const  getAllProjectDetails = require('../get-projects.js')
const Project = require('../models/Project'); // Make sure this path is correct
const Issue = require('../models/Issue'); // Make sure this path is correct
const authenticateToken = require('../authMiddleware');
const mongoose=require('mongoose');



// Helper function to generate a project key
function generateProjectKey(projectName) {
  return projectName.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 1000);
}

// Route to handle project creation
router.post('/create-project',authenticateToken,async(req, res) => {
  console.log('Request to create project received:', req.body);
  const { projectName, description, issueType, summary, priority, dueDate, price } = req.body;

  const projectKey = generateProjectKey(projectName);

  try {
    if(!req.user || !req.user.userId){
      return res.status(400).send('User Authentication failed');
    }
    // Creating the project in JIRA or another system
    const projectKeyResponse = await createProject({
      projectName,
      projectKey
    });

    // Save project data in local database
    const newProject = new Project({
      projectName,
      projectKey,
      price,
      createdBy: new mongoose.Types.ObjectId(req.user.userId) 
  });

    await newProject.save();
    console.log(`Project created successfully with key: ${projectKeyResponse}`);

    // Format the due date to ensure it's in ISO format (YYYY-MM-DD)
    const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

    // Create an issue with the provided due date
    const issueResponse = await createIssue({
      projectKey: projectKeyResponse,
      issueType,
      summary,
      description,
      priorityName: priority,
      dueDate: formattedDueDate
    });

    // Optionally save issue details in local database
    const newIssue = new Issue({
      projectKey: projectKeyResponse,
      issueType,
      summary,
      priority,
      dueDate: formattedDueDate
    });

    await newIssue.save();
    console.log(`Issue created successfully with key: ${issueResponse}`);

    res.status(201).json({
      message: 'Project and issues created successfully',
      projectKey: projectKeyResponse,
      issueKey: issueResponse,
      projectData: newProject,
      issueData: newIssue
    });

  } catch (error) {
    console.error('Error during project or issue creation:', error);
    res.status(500).send('Failed due to server error');
  }
});


router.get('/count', async (req, res) => {
  try {
      const count = await Project.countDocuments();
      res.json({ count });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/categorized-tasks-by-project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  console.log(`Fetching categorized tasks for project ID: ${projectId}`);
  try {
    const categorizedTasks = await jiraService.getCategorizedTasksByProject(projectId);
    console.log(`Categorized tasks fetched successfully for project ID: ${projectId}`);
    res.json(categorizedTasks);
  } catch (error) {
    console.error('Error fetching categorized tasks:', error);
    res.status(500).send('Internal server error');
  }
});

// GET endpoint to fetch tasks by project ID
router.get('/tasks/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  console.log(`Fetching tasks for project ID: ${projectId}`);
  try {
    const tasks = await jiraService.getTasks(projectId);
    console.log(`Tasks fetched successfully for project ID: ${projectId}`);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks from Jira:', error);
    res.status(500).send('Error fetching tasks from Jira');
  }
});

// GET endpoint to fetch all categorized tasks
router.get('/categorized-tasks', async (req, res) => {
  console.log('Fetching all categorized tasks');
  try {
    const categorizedTasks = await jiraService.getCategorizedTasks();
    console.log('Categorized tasks fetched successfully');
    res.json(categorizedTasks);
  } catch (error) {
    console.error('Error fetching categorized tasks from Jira:', error);
    res.status(500).send('Error fetching categorized tasks from Jira');
  }
});

module.exports = router;
