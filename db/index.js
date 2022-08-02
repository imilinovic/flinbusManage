const { Pool } = require('pg')
const DB_LOGIN_DATA = require("./consts");

const pool = new Pool(DB_LOGIN_DATA);

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
