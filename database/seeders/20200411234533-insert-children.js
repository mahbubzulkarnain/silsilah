'use strict';

const { tableName } = require("../migrations/20200411214450-create-children");
const { tableName: tableNameCouple } = require("../migrations/20200411212936-create-couple");

const { findPeopleIDBySureName } = require('./20200411231233-insert-couple');

const findCoupleIDByHusbandAndWife = async (husband, wife, sequelize) => {
  const [[{ id } = { id: "" }]] = await sequelize.query(`
    SELECT id FROM "${ tableNameCouple }" 
    WHERE 
        "husband_id" = '${ await findPeopleIDBySureName(husband, sequelize) }' AND
        "wife_id" = '${ await findPeopleIDBySureName(wife, sequelize) }'
  `);
  return id
};


const records = async (sequelize) => [{
  parent_id: await findCoupleIDByHusbandAndWife("Muhammad", "Khadija", sequelize),
  child_id : await findPeopleIDBySureName("Fatimah", sequelize),
}, {
  parent_id: await findCoupleIDByHusbandAndWife("Muhammad", "Khadija", sequelize),
  child_id : await findPeopleIDBySureName("Zainab", sequelize),
}, {
  parent_id: await findCoupleIDByHusbandAndWife("Muhammad", "Khadija", sequelize),
  child_id : await findPeopleIDBySureName("Umm Kulthum", sequelize),
}, {
  parent_id: await findCoupleIDByHusbandAndWife("Ali", "Fatimah", sequelize),
  child_id : await findPeopleIDBySureName("Husayn", sequelize),
}, {
  parent_id: await findCoupleIDByHusbandAndWife("Ali", "Fatimah", sequelize),
  child_id : await findPeopleIDBySureName("Hasan", sequelize),
}, {
  parent_id: await findCoupleIDByHusbandAndWife("Abu al-As", "Zainab", sequelize),
  child_id : await findPeopleIDBySureName("Umamah", sequelize),
}];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, await records(queryInterface.sequelize), {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, {
      parent_id: { [Sequelize.Op.in]: await records.map(({ parent_id }) => parent_id) },
      child_id : { [Sequelize.Op.in]: await records.map(({ child_id }) => child_id) },
    }, {});
  }
};
