
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "name_picker"
  
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  }
};
