const jwt = require("jsonwebtoken");
const Middleware = {};

Middleware.isAuthenticated = async (req, res, next) => {
  let token = req.headers["Autorization"];
  if (token != undefined) {
    token = token.replace("token=", "");
    jwt.verify(token, "secretkey", (error, user) => {
      if (error) {
        console.log(error);
        res.status(403).json({ ok: false, message: "403 Forbidden" });
      } else {
        console.log(user);
        next();
      }
    });
  } else {
    res.status(401).json({ ok: false, message: "401 Unauthorized" });
  }
};

module.exports = Middleware;
