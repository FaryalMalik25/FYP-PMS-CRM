
var axios = require('axios');
require('dotenv').config();


const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
  username: username,
  password: password
};
const Project = require('./models/Project');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
function formatPrice(price) {
  return formatter.format(price);
}

async function getProjectPriceFromDB(projectKey) {
  try {
    const project = await Project.findOne({ projectKey: projectKey }); // Fetch the project using the unique projectKey
    return project ? project.price : null; // Return the price if the project is found, otherwise return null
  } catch (error) {
    console.error('Failed to fetch price from DB:', error);
    return null; // Return null if there's an error
  }
}






function calculateProjectProgress(issues) {
  let doneCount = 0;
  issues.forEach(issue => {
    if (issue.fields && issue.fields.status && issue.fields.status.name === 'Done') {
      doneCount++;
    }
  });
  return issues.length > 0 ? (doneCount / issues.length) * 100 : 0;
}

function enrichProjectDetails(projectDetails, issues) {
  projectDetails.progress = calculateProjectProgress(issues);
  projectDetails.issues = issues; // Include enriched issues details
}



async function getIssuesForProject(baseUrl, projectId, projectsConfig) {
  const searchUrl = `${baseUrl}/rest/api/3/search`;
  const jql = `project=${projectId}`;
  const fields = 'status,duedate,priority'; // Specify the fields you want from issues
  const response = await axios.get(searchUrl, {
    headers: projectsConfig.headers,
    auth: projectsConfig.auth,
    params: { jql, fields }
  });

  
  // Transform the issues to include only relevant details
  return response.data.issues.map(issue => ({
    id: issue.id,
    key: issue.key,
    status:issue.fields.status.name,
    dueDate: issue.fields.duedate,
    priority: issue.fields.priority ? issue.fields.priority.name : 'Normal'
  }));
  
  
} 




// Fetch detailed information for all projects including their issues
async function getAllProjectDetails() {
  try {
    const baseUrl = `https://${domain}.atlassian.net`;
    const projectsUrl = baseUrl + '/rest/api/3/project/search';
    const projectsConfig = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };

    

    const projectsResponse = await axios.get(projectsUrl, projectsConfig);
    const projects = projectsResponse.data.values; // Adjust based on actual response structure

    const detailedProjects = await Promise.all(projects.map(async (project) => {
      const projectDetailsUrl = `${baseUrl}/rest/api/3/project/${project.id}`;
      const projectDetailsResponse = await axios.get(projectDetailsUrl, projectsConfig);
      const projectDetails = projectDetailsResponse.data;

      const issues = await getIssuesForProject(baseUrl, project.id, projectsConfig);
      enrichProjectDetails(projectDetails, issues);

      const price = await getProjectPriceFromDB(project.key);
      const formattedPrice = formatPrice(price);
      return {
        id:project.id,
        title: projectDetails.name, // Assuming name is the title
        name: projectDetails.key, // Project key as name
        progress: calculateProjectProgress(issues),
        issues,
        price: formattedPrice
      }; // Return enriched project details with specific fields
    }));

    console.log(detailedProjects);
    return detailedProjects;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error; // Rethrow the error for caller to handle
  }
}

const { Client} = require('./models/Client')

// Example function to sync projects from JIRA and associate with a client
async function syncProjectsFromJira(userId) {
  // Fetch all projects from JIRA
  const projectsDetails = await getAllProjectDetails();
  
  // Example filter function, replace with actual logic to determine which projects belong to the user
  const userProjects = projectsDetails.filter(project => {
      // Assuming there's a mechanism or attribute to match a project to a user, such as a user ID stored in the project details.
      // For instance, if each project had an attribute `userId` that we could check:
      return project.userId === userId;
  });

  // Update each relevant project in your database
  userProjects.forEach(async (project) => {
      await Project.updateOne(
          { projectId: project.name },  // Using project.name as a JIRA project ID
          {
              createdBy: userId,
              title: project.title,
              priority: project.issues[0]?.priority,
              status: project.issues[0]?.status,
              progress: calculateProjectProgress(project.issues)
          },
          { upsert: true }
      );
  });
}

module.exports = { getIssuesForProject, getAllProjectDetails, syncProjectsFromJira };














