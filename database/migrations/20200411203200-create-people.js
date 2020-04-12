'use strict';

const tableName = 'Peoples';
const { addTriggerUpdatedAt } = require("../helper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);

    await queryInterface.createTable(tableName, {
      id             : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      sure_name      : {
        allowNull: false,
        type     : Sequelize.STRING
      },
      nick_name      : {
        defaultValue: '-',
        type        : Sequelize.STRING,
      },
      gender         : {
        allowNull: false,
        type     : Sequelize.ENUM,
        values   : [
          'MAN',
          'WOMEN',
        ],
      },
      date_of_birth  : {
        type: Sequelize.DATE,
      },
      date_of_death  : {
        type: Sequelize.DATE,
      },
      address        : {
        defaultValue: '-',
        type        : Sequelize.TEXT,
      },
      phone          : {
        defaultValue: '-',
        type        : Sequelize.STRING(20),
      },
      email          : {
        defaultValue: '-',
        type        : Sequelize.STRING,
      },
      blood_type     : {
        defaultValue: '-',
        type        : Sequelize.STRING(5),
      },
      profile_picture: {
        type: Sequelize.STRING(512),
      },
      created_at     : {
        allowNull   : false,
        type        : Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at     : {
        type: Sequelize.DATE
      }
    });

    return addTriggerUpdatedAt(queryInterface, tableName)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  },

  tableName,
};
