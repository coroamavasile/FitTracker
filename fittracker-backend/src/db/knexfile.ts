import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mssql',
    connection: {
      host: '127.0.0.1',
      port: 1433,
      user: 'user1',
      password: '123456789',
      database: 'fitness_db4',
    },
    migrations: {
      directory: './migrations',
    },
  },
};

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: 'dpg-ckleo38u1l6c73b9r9p0-a',
//       port: 5432,
//       user: 'fitdb2_user',
//       password: 'lzj7057VC2XcVv9OfswhIUoNrwATvNWZ',
//       database: 'fitdb2',
//       ssl: true,
//       connectionString:
//         'postgres://fitdb2_user:lzj7057VC2XcVv9OfswhIUoNrwATvNWZ@dpg-ckleo38u1l6c73b9r9p0-a.oregon-postgres.render.com/fitdb2',
//     },
//     migrations: {
//       directory: './migrations',
//     },
//   },
// };

// postgres://vasi:AHPHAv7G8qqxRzQ5xbjpUcYsv9Z9zEde@dpg-cjvlv0p5mpss73eu0vd0-a.frankfurt-postgres.render.com/fittrackerdb_2m46
export default config;
