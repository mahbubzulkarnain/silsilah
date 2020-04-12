'use strict';

const { tableName } = require("../migrations/20200411212936-create-couple");
const { tableName: tableNamePeople } = require("../migrations/20200411203200-create-people");

const records = async (sequelize) => [
  {
    husband_id: await findPeopleIDBySureName("Adam", sequelize),
    wife_id   : await findPeopleIDBySureName("Siti Hawa", sequelize),
  },
  {
    husband_id: await findPeopleIDBySureName("Muhammad", sequelize),
    wife_id   : await findPeopleIDBySureName("Khadija", sequelize),
  },
  {
    husband_id: await findPeopleIDBySureName("Muhammad", sequelize),
    wife_id   : await findPeopleIDBySureName("Aisha", sequelize),
  },
  {
    husband_id: await findPeopleIDBySureName("Ali", sequelize),
    wife_id   : await findPeopleIDBySureName("Fatimah", sequelize),
  },
  {
    husband_id: await findPeopleIDBySureName("Abu al-As", sequelize),
    wife_id   : await findPeopleIDBySureName("Zainab", sequelize),
  },
];

const findPeopleIDBySureName = async (sure_name, sequelize) => {
  const [[{ id } = { id: "" }]] = await sequelize.query(`SELECT id FROM "${ tableNamePeople }" WHERE "sure_name" = '${ sure_name }'`);
  return id
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, await records(queryInterface.sequelize), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, {
      husband_id: { [Sequelize.Op.in]: records.map(({ husband_id }) => husband_id) },
      wife_id   : { [Sequelize.Op.in]: records.map(({ wife_id }) => wife_id) },
    }, {});
  },

  findPeopleIDBySureName,
};
