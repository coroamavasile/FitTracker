import type { Knex } from 'knex';
require('dotenv').config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mssql',
    connection: {
      host: '127.0.0.1',
      port: 1433,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
    },
  },
};

// const config : { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: '',
//       port: 5432,
//       user: '',
//       password: '',
//       database: '',
//       ssl: true,
//       connectionString:
//         '',
//     },
//     migrations: {
//       directory: './migrations',
//     },
//   },
// };

export default config;
