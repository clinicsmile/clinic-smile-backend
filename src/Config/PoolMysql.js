/*const mysql = require("mysql2");
const configuration = require("./Configurations");
let pool;
function createPool() {
  pool = mysql.createPool({
    host: configuration.MYSQL_HOST,
    port: configuration.MYSQL_PORT,
    user: configuration.MYSQL_USER,
    password: configuration.MYSQL_PASSWORD,
    database: configuration.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 30,
    queueLimit: 0,
  });
  console.log("Pool de conexiones a la base de datos creado exitosamente!!");
  // Manejar el evento de error en el pool
  pool.on('error', (err) => {
    console.error('Error en el pool de conexiones:', err);
    // Volver a crear el pool en caso de error
    createPool();
  });
}
createPool();
// Export the function as a module
module.exports = {pool,createPool};*/