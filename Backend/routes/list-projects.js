

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Project=require('../models/Project')
const Issue=require('../models/Issue')

const authenticateToken=require('../authMiddleware')
const mongoose=require('mongoose')
require('dotenv').config();

const { getIssuesForProject, getAllProjectDetails } = require('../get-projects');

// GET endpoint to fetch all project details including their issues
router.get('/get-all-project-details', async (req, res) => {
  try {
    const projectDetails = await getAllProjectDetails();
    res.json(projectDetails);
  } catch (error) {
    console.error('Get all project details error:', error);
    res.status(500).send('Failed to get all project details');
  }
});

// GET endpoint to fetch issues by project ID
router.get('/issues/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const issues = await getIssuesForProject(`https://${process.env.DOMAIN}.atlassian.net`, projectId, {
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: process.env.ATLASSIAN_USERNAME,
        password: process.env.ATLASSIAN_API_KEY
      }
    });
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues for project ID:', projectId, error);
    res.status(500).send('Error fetching issues from Jira');
  }
});

router.get('/categorized-tasks/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const categorizedTasks = await getCategorizedTasksByProject(projectId);
    res.json(categorizedTasks);
  } catch (error) {
    console.error('Error fetching categorized tasks for project ID:', projectId, error);
    res.status(500).send('Error fetching categorized tasks from Jira');
  }
});


// GET endpoint to fetch project progress data
router.get('/projects/:projectId/progress', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const issues = await getIssuesForProject(`https://${process.env.DOMAIN}.atlassian.net`, projectId, {
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: process.env.ATLASSIAN_USERNAME,
        password: process.env.ATLASSIAN_API_KEY
      }
    });

    // Calculate progress based on issue statuses
    const progressData = calculateProgress(issues);
    res.json(progressData);
    console.log(progressData);
  } catch (error) {
    console.error('Error fetching progress data for project ID:', projectId, error);
    res.status(500).send('Error fetching progress data from Jira');
  }
});

// Function to calculate progress
function calculateProgress(issues) {
  const totalIssues = issues.length;
  const completedIssues = issues.filter(issue => issue.status === 'Done').length;
  const progress = (completedIssues / totalIssues) * 100;

  return {
    totalIssues,
    completedIssues,
    progress
  };
}





router.get('/client/projects', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.userId || !mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).send('Invalid user ID format');
    }

    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const projects = await Project.find({ createdBy: userId }).exec();

    const projectDetails = await Promise.all(projects.map(async project => {
      const issues = await getIssuesForProject(`https://${process.env.DOMAIN}.atlassian.net`, project.projectKey, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: process.env.ATLASSIAN_USERNAME,
          password: process.env.ATLASSIAN_API_KEY
        }
      });
      const progressData = calculateProgress(issues);

      return {
        id: project._id,
        title: project.projectName,
        price: project.price,
        progress: progressData.progress,
        issues: issues.map(issue => ({
          id: issue._id,
          issueType: issue.issueType,
          summary: issue.summary,
          priority: issue.priority,
          status: issue.status,
          dueDate: issue.dueDate 
        }))
      };
    }));

    res.json(projectDetails);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
