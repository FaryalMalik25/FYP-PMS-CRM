



const axios = require('axios');
require('dotenv').config();

const domain = process.env.DOMAIN;
const leadAccountId = process.env.LEAD_ACCT_ID
const auth = {
  username: process.env.ATLASSIAN_USERNAME,
  password: process.env.ATLASSIAN_API_KEY
};

async function createProject({ projectName, projectKey }) {
 
  const baseUrl = `https://${domain}.atlassian.net`;

  const data = {
    key: projectKey,
    name: projectName,
    projectTypeKey: 'software',
    leadAccountId: process.env.LEAD_ACCT_ID,
     
  };

  const config = {
    headers: { 'Content-Type': 'application/json' },
    auth: auth
  };

  try {
    const response = await axios.post(`${baseUrl}/rest/api/3/project`, data, config);
    console.log(`Project created: ${response.data.key}`);
    return response.data.key;
  } catch (error) {
    console.error('Error creating project:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create project due to an API error');
  }
}

module.exports = createProject;


