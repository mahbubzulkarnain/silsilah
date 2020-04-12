'use strict';

const { tableName } = require("../migrations/20200411203200-create-people");

const records = [
  {
    sure_name: 'Mahbub Zulkarnain',
    nick_name: 'Mahbub',
    gender   : 'MAN',
    email    : 'mahbub.zulkarnain[at]gmail.com',
    address  : 'Cirebon, Jawa Barat, Indonesia'
  },
  { sure_name: 'Adam', gender: 'MAN' },
  { sure_name: 'Siti Hawa', gender: 'WOMEN' },
  { sure_name: 'Muhammad', gender: 'MAN' },
  { sure_name: 'Khadija', gender: 'WOMEN' },
  { sure_name: 'Aisha', gender: 'WOMEN' },
  { sure_name: 'Ali', gender: 'MAN' },
  { sure_name: 'Fatimah', gender: 'WOMEN' },
  { sure_name: 'Husayn', gender: 'MAN' },
  { sure_name: 'Hasan', gender: 'MAN' },
  { sure_name: 'Abu al-As', gender: 'MAN' },
  { sure_name: 'Zainab', gender: 'WOMEN' },
  { sure_name: 'Umamah', gender: 'WOMEN' },
  { sure_name: 'Uthman', gender: 'MAN' },
  { sure_name: 'Umm Kulthum', gender: 'WOMEN' },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, records, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, {
      sure_name: { [Sequelize.Op.in]: records.map(({ sure_name }) => sure_name) },
    }, {});
  }
};
