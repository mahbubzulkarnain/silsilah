import { Sequelize } from 'sequelize';

export { q, quote } from './utils';

export default (new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect  : 'postgres',
    host     : (process.env.DB_HOST || 'localhost'),
    port     : +(process.env.DB_PORT || 5432),
    timezone : '+07:00',
  },
));
