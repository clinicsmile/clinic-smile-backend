// import User from "./user.js";
// import Auth from "./auth.js";
import Clinics from "./clinics.js";

function Routes(app, db, response) {
  this.routes = {
    // Auth,
    // User,
    Clinics,
  };

  this.associate = function () {
    var names = Object.keys(this.routes);
    for (var i = 0; i < names.length; i++) {
      this[names[i]] = this.routes[names[i]](app, db, response);
    }
  };
  this.associate();
}

export default Routes;
