const axios = require('axios');
require('dotenv').config();

const domain = process.env.DOMAIN;
const auth = {
  username: process.env.ATLASSIAN_USERNAME,
  password: process.env.ATLASSIAN_API_KEY
};

async function createIssue({ projectKey, issueType, summary, description,priorityName,dueDate}) {
  const baseUrl = `https://${domain}.atlassian.net`;

  const data = {
    fields: {
      project: { key: projectKey },
      summary: summary,
      description: description,
      issuetype: { name: issueType },
      priority: { name: priorityName },
      duedate: dueDate
      // "customfield_10035": startDate, // Example custom field ID for start date
      // "customfield_10036": endDate, // Example custom field ID for end date
      // "customfield_10034": price // Example custom field ID for price
    }
  };

  const config = {
    headers: { 'Content-Type': 'application/json' },
    auth: auth
  };

  try {
    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, config);
    console.log('Issue created:', response.data);
    return response.data.key;
  } catch (error) {
    console.error('Error creating issue:', error.response ? error.response.data.errors : error.message);
    throw new Error('Failed to create issue');
  }
}

module.exports = createIssue;







