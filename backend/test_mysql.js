const mysql = require('mysql2/promise');
const fs = require('fs');
const dotenv = require('dotenv');

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const test = async () => {
  try {
    console.log('Connecting to MySQL at:', process.env.DB_HOST);
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectTimeout: 5000
    });
    console.log('Connection successful!');
    
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('Query result:', rows[0].result);
    
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
};

test();
