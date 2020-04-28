// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

// eslint-disable-next-line no-unused-expressions
dotenv && dotenv.config();

process.env.NODE_ENV = 'DEV';

jest.setTimeout(60000);
