const database = "silsilah_";

module.exports = {
    dev: {
        username: "postgres",
        password: "postgres",
        database: database + 'dev',
        host: "localhost",
        port: 32768,
        dialect: "postgres"
    },
    test: {
        username: "postgres",
        password: "postgres",
        database: database + 'test',
        host: "localhost",
        port: 32768,
        dialect: "postgres"
    },
    production: {
        username: "postgres",
        password: "postgres",
        database: database + 'prod',
        host: "localhost",
        port: 32768,
        dialect: "postgres"
    }
};
