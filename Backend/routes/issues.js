
// create-issue.route.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware');
const createIssue = require('../create-issue');
const Issue = require('../models/Issue');
const Project = require('../models/Project');

router.post('/create-issue', authenticateToken, async (req, res) => {
  const { projectName, issueType, summary, description, priority, dueDate } = req.body;

  try {
    // Find the project by projectName to get the projectKey
    const project = await Project.findOne({ projectName  });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Format the due date to ensure it's in ISO format (YYYY-MM-DD)
    const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

    // Create an issue in JIRA
    const issueKey = await createIssue({
      projectKey: project.projectKey,
      issueType,
      summary,
      description,
      priorityName: priority,
      dueDate: formattedDueDate,
    });

    // Save the issue details in the local database
    const newIssue = new Issue({
      projectKey: project.projectKey,
      projectName: project.projectName,
      issueType,
      summary,
      description,
      priority,
      dueDate: formattedDueDate,
      jiraIssueKey: issueKey,
      createdBy: req.user.id,
    });

    await newIssue.save();

    res.status(201).json({
      message: 'Issue created successfully',
      issueKey,
      issueData: newIssue,
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).send('Failed to create issue due to server error');
  }
});

module.exports = router;



