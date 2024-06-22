


const express = require('express');
const router = express.Router();
const axios = require('axios');
const authenticateToken = require('../authMiddleware');
const mongoose = require('mongoose');
const ProjectUserMapping = require('../models/ProjectMapping');
const Project=require('../models/Project');
const Issue = require('../models/Issue');
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Function to fetch projects from JIRA
async function fetchProjectsFromJira() {
    const baseUrl = `https://${process.env.DOMAIN}.atlassian.net/rest/api/3/project/search`;
    const config = {
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.ATLASSIAN_USERNAME}:${process.env.ATLASSIAN_API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await axios.get(baseUrl, config);
        return response.data.values;  // Return all projects, filtering will be done via database
    } catch (error) {
        console.error('Error fetching projects from JIRA:', error);
        throw error;
    }
}

router.post('/map-project', async (req, res) => {
    try {
        const { projectId, userId } = req.body;  // Assume these are passed in the request body
        const mapping = new ProjectUserMapping({ projectId, userId });
        await mapping.save();
        res.status(201).send('Mapping created successfully');
    } catch (error) {
        console.error('Error creating mapping:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/user-projects', authenticateToken, async (req, res) => {
    try {
        console.log('User ID:', req.user._id);
        const mappings = await ProjectUserMapping.find({ userId: req.user._id });
        console.log('Mappings:', mappings);

        const projectIds = mappings.map(mapping => mapping.projectId);
        console.log('Project IDs:', projectIds);

        const projects = await Project.find({ '_id': { $in: projectIds } });
        console.log('Projects:', projects);

        res.json(projects);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        res.status(500).send('Error fetching projects');
    }
});



    
router.get('/projects', authenticateToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId || !mongoose.Types.ObjectId.isValid(req.user.userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const userId = new mongoose.Types.ObjectId.toString()(req.user.userId);  // Convert string ID to ObjectId correctly
        const mappings = await ProjectUserMapping.find({ userId: userId });
        const projectIds = mappings.map(mapping => new mongoose.Types.ObjectId(mapping.projectId));
        const projects = await Project.find({ '_id': { $in: projectIds } });

        res.json(projects);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        res.status(500).send('Error fetching projects');
    }
});
router.get('/my-projects', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(400).send('User authentication required.');
    }
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    console.log("User ID from token:", req.user.userId);
    console.log("Converted User ID to ObjectId for query:", userId);

    try {
        console.log("User ID used for query:", userId);
        console.log("Query being executed:", { createdBy: userId });
        // Fetch projects from the database where the 'createdBy' field matches the logged-in user's ID
        const projects = await Project.find({ createdBy: req.user.userId }).exec();
        const issues=await Issue.find({createdBy:req.user.userId})
        console.log("Projects fetched:", projects); // This logs the fetched projects
       
        if (projects.length === 0) {
            console.log("No projects found for user ID:",+ req.user.userId); // This logs if no projects are found
        }

        const projectDetails = await Promise.all(projects.map(async project => {
            const issues = await Issue.find({ projectKey: project.projectKey });
            return {
                id: project._id,
                title: project.projectName,
                price: project.price,
                issues: issues.map(issue => ({
                    id: issue._id,
                    issueType: issue.issueType,
                    summary: issue.summary,
                    priority: issue.priority,
                    dueDate: issue.dueDate ? issue.dueDate.toISOString().split('T')[0] : null // Check if due date is not null
                }))
            };
        }));

        res.json(projectDetails);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        res.status(500).send('Server error');
    }





    router.get('/projects/:key', async (req, res) => {
        try {
          const projectKey = req.params.key;
          console.log(`Querying for project key: ${projectKey}`);
      
          const project = await Project.findOne({ projectKey }).exec();
      
          if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
      
          // Fetch issues related to this project
          const issues = await Issue.find({ projectKey }).exec();
          const projectWithIssues = { ...project.toObject(), issues };
      
          res.status(200).json(projectWithIssues);
        } catch (error) {
          console.error('Error fetching project details:', error); // Log the error
          res.status(500).json({ message: 'Failed to fetch project', error });
        }
      });

});


module.exports = router;
