'use strict';

const tableName = 'Children';
const { tableName: tableNameCouple } = require("./20200411212936-create-couple");
const { tableName: tableNamePeople } = require("./20200411203200-create-people");

const { addTriggerUpdatedAt } = require("../helper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);

    await queryInterface.createTable(tableName, {
      id              : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      parent_id      : {
        allowNull : false,
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: tableNameCouple,
        },
      },
      child_id         : {
        allowNull : false,
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: tableNamePeople,
        },
      },
      created_at      : {
        allowNull   : false,
        type        : Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at      : {
        type: Sequelize.DATE
      }
    });

    await queryInterface.sequelize.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "children_child" ON "${tableName}" ("child_id");`
    ).catch(console.log);
    await queryInterface.sequelize.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "children_parent_child" ON "${tableName}" ("parent_id", "child_id");`
    ).catch(console.log);

    return addTriggerUpdatedAt(queryInterface, tableName)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  },

  tableName,
};
