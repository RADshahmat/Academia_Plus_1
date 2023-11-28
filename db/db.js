const oracle = require("oracledb");

const pool = oracle.createPool({
  user: 'system',
  password: '12345',
  connectString: 'localhost/kaka',
});

async function query(sql, binds = [], options = {}) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(sql, binds, options);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }
}

module.exports = {
  query,
};
