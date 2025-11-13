// db-connector.js
// Citation:
// Date: 11/05/2025
// Adapted from: OSU CS340 starter code and MySQL2 documentation
// Source: https://www.npmjs.com/package/mysql2
// AI Tool Use: ChatGPT (OpenAI GPT-5 model) helped explain how to adapt to ES modules.

import mysql from 'mysql2/promise';

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_fermanrj',
  password: '9012',
  database: 'cs340_fermanrj'
});

// Export the pool for use in other files
export default pool;