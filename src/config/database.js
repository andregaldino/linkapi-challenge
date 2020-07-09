require('dotenv').config();

module.exports = {
  mongo: {
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_DATABASE || 'database',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'secret',
  },
};
