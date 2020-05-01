/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars */
const tableName = 'Couples';
const { tableName: tableNamePeople } = require('./20200411203200-create-people');

const { addTriggerUpdatedAt } = require('../helper');

module.exports = {
  up : async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);

    await queryInterface.createTable(tableName, {
      id : {
        allowNull    : false,
        primaryKey   : true,
        type         : Sequelize.UUID,
        defaultValue : Sequelize.literal('uuid_generate_v4()'),
      },
      husband_id : {
        allowNull  : true,
        type       : Sequelize.UUID,
        references : {
          key   : 'id',
          model : tableNamePeople,
        },
      },
      wife_id : {
        allowNull  : false,
        type       : Sequelize.UUID,
        references : {
          key   : 'id',
          model : tableNamePeople,
        },
      },
      date_of_marriage : {
        type : Sequelize.DATE,
      },
      date_of_divorce : {
        type : Sequelize.DATE,
      },
      created_at : {
        allowNull    : false,
        type         : Sequelize.DATE,
        defaultValue : Sequelize.fn('now'),
      },
      updated_at : {
        type : Sequelize.DATE,
      },
    });

    await queryInterface.sequelize.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "couple_wife" ON "${tableName}" ("wife_id") WHERE "date_of_divorce" IS NULL;`,
    ).catch(console.log);
    await queryInterface.sequelize.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "couple_husband_wife" ON "${tableName}" ("husband_id", "wife_id");`,
    ).catch(console.log);

    return addTriggerUpdatedAt(queryInterface, tableName);
  },

  down : (queryInterface, Sequelize) => queryInterface.dropTable(tableName),

  tableName,
};
