/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = {
  up : (queryInterface, Sequelize) => queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION trigger_updated_at_column() RETURNS TRIGGER AS $$
      BEGIN
        NEW."updated_at" = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql'; 
    `),
  down : (queryInterface, Sequelize) => queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS trigger_updated_at_column;
    `),
};
