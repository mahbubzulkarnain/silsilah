// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const dotenv = require('dotenv');

// eslint-disable-next-line no-unused-expressions
dotenv && dotenv.config();

module.exports = {
  username : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  dialect  : 'postgres',
};
