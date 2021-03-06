/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars */
const { tableName } = require('../migrations/20200411212936-create-couple');
const { tableName: tableNamePeople } = require('../migrations/20200411203200-create-people');

const findPeopleIDBySureName = async (sure_name, sequelize) => {
  const [[{ id } = { id: '' }]] = await sequelize.query(`SELECT id FROM "${tableNamePeople}" WHERE "sure_name" = '${sure_name}'`);
  return id;
};

const records = async (sequelize) => [
  {
    husband_id : await findPeopleIDBySureName('Adam', sequelize),
    wife_id    : await findPeopleIDBySureName('Siti Hawa', sequelize),
  },
  {
    husband_id : await findPeopleIDBySureName('Muhammad', sequelize),
    wife_id    : await findPeopleIDBySureName('Khadija', sequelize),
  },
  {
    husband_id : await findPeopleIDBySureName('Muhammad', sequelize),
    wife_id    : await findPeopleIDBySureName('Aisha', sequelize),
  },
  {
    husband_id : await findPeopleIDBySureName('Ali', sequelize),
    wife_id    : await findPeopleIDBySureName('Fatimah', sequelize),
  },
  {
    husband_id : await findPeopleIDBySureName('Abu al-As', sequelize),
    wife_id    : await findPeopleIDBySureName('Zainab', sequelize),
  },
];

module.exports = {
  up : async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    tableName, await records(queryInterface.sequelize), {},
  ),

  down : (queryInterface, Sequelize) => queryInterface.bulkDelete(tableName, {
    husband_id : { [Sequelize.Op.in]: records.map(({ husband_id }) => husband_id) },
    wife_id    : { [Sequelize.Op.in]: records.map(({ wife_id }) => wife_id) },
  }, {}),

  findPeopleIDBySureName,
};
