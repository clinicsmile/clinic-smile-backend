
// import User from './user.js';
// import Auth from './auth.js';


function Routes(app, db) {
  this.routes = {
    // User
  };



  this.associate = function() {
  	var names = Object.keys(this.routes);
    for (var i = 0; i < names.length; i++) {
      this[names[i]] = this.routes[names[i]](app, db);
    }
  }

  this.associate();
}

export default Routes; 

