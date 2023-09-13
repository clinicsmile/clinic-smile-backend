const Querys = {};

Querys.ValidateLogin = (username, password, Connection) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `select * from clinicsmile.users where username='${username}' and password='${password}'`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.length);
        }
      }
    );
  });
};

Querys.GetUsers = (Connection) => {
  return new Promise((resolve, reject) => {
    Connection.query(`Select * from clinicsmile.users`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = Querys;
