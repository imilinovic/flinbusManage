const { Pool } = require('pg')

const pool = new Pool({
  user: 'flinbus',
  database: 'flinbus',
  password: '31432014320143012343124654107',
  port: 5432,
  host: '144.91.125.179',
});

async function retrieveData(command) {
  try {
    const res = await pool.query(command);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { pool: pool, retrieveData: retrieveData,
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params)
        .then(res => {
            const duration = Date.now() - start;
            //console.log('executed query', {text, params, duration, rows: res.rows});
            return res;
        });
  },
};
