try {
  require('dotenv')
    .config();
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

process.env.NODE_ENV = 'DEV';

jest.setTimeout(60000);
