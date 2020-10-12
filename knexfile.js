// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
