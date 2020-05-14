const pgp = require('pg-promise');
const promise = require('bluebird');

function createDB({ connectionString }) {
  const pg = pgp({ promiseLib: promise, noLocking: true });
  const db = pg(connectionString);
  return db;
}

module.exports = createDB;
