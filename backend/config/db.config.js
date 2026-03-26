const { Sequelize } = require('sequelize');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env or .env.local
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set to console.log to see raw SQL
    define: {
      timestamps: false // already handled by triggers and model definitions
    }
  }
);

module.exports = sequelize;
