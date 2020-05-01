module.exports = {
  addTriggerUpdatedAt : (queryInterface, tableName, options = {}) => queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS "set_updated_at" ON "${tableName}";
    CREATE TRIGGER "set_updated_at" BEFORE UPDATE ON "${tableName}"
    FOR EACH ROW EXECUTE PROCEDURE trigger_updated_at_column();
  `, options),
};
