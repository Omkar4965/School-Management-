const pool = require('../config');
const fs = require('fs').promises;
const path = require('path');

async function runMigrations() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const sqlContent = await fs.readFile(path.join(__dirname, '../../../database.sql'), 'utf8');
    await client.query(sqlContent);
    
    await client.query('COMMIT');
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
  }
}

runMigrations();