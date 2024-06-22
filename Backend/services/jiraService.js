

const axios = require('axios');
require('dotenv').config();

const jiraAxios = axios.create({
  baseURL: process.env.JIRA_BASE_URL,
  auth: {
    username: process.env.ATLASSIAN_USERNAME,
    password: process.env.ATLASSIAN_API_KEY,
  },
  headers: { 'Content-Type': 'application/json' },
});


// Function to fetch tasks for a specific project and categorize them by status
exports.getCategorizedTasksByProject = async (projectId) => {
  try {
    // Update the JQL to filter issues by project ID and order by creation date
    const jql = `project=${projectId} ORDER BY created DESC`;
    const response = await jiraAxios.get(`/rest/api/3/search?jql=${encodeURIComponent(jql)}`);

    // Categorize the issues by status
    const categorized = response.data.issues.reduce((acc, issue) => {
      const status = issue.fields.status.name;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        status: status,
      
      });
      return acc;
    }, {});

    return categorized;
  } catch (error) {
    console.error('Error fetching or categorizing tasks from Jira:', error);
    throw error;
  }
};

