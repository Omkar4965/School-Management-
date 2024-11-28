const { Pool } = require('@neondatabase/serverless');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to Neon PostgreSQL database');
  }
});

module.exports = pool;