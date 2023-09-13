/*const { pool, createPool } = require("./PoolMysql");

function GetConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        if (!connection.stream._writableState.closed) {
          resolve(connection);
        } else {
          createPool();
          pool.getConnection((error, connection) => {
            if (error) {
              reject(error);
            } else {
              resolve(connection);
            }
          });
        }
      }
    });
  });
}

module.exports = { GetConnection };*/
