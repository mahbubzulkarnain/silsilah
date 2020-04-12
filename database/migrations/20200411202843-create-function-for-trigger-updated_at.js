'use strict';
module.exports = {
  up  : async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION trigger_updated_at_column() RETURNS TRIGGER AS $$
      BEGIN
        NEW."updated_at" = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql'; 
    `)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS trigger_updated_at_column;
    `);
  }
};
