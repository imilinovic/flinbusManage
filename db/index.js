const { Pool } = require('pg')

const pool = new Pool({
  user: 'flinbus',
  database: 'flinbus',
  password: '31432014320143012343124654107',
  port: 5432,
  host: '144.91.125.179',
});

module.exports = { pool: pool };