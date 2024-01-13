
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

let host = process.env.DB_HOST;
console.log(`Using first host ${host}`);
if (process.env.NODE_ENV === 'production') {
  console.log('Production environment detected.');
  console.log(process.env.CLOUD_SQL_CONNECTION_NAME)
  host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;
  console.log(`Changing host ${host}`);
}


export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: host,
    dialect: 'mysql',
});