import config from "../config/config.js";
import Sequelize from "sequelize";
// Models
import Clinic from "./clinic.js";

function Models() {
  this.models = {
    Clinic,
  };
  this.sequelize = null;
  this.Sequelize = Sequelize;
  this.Op = Sequelize.Op;

  this.associate = function () {
    var names = Object.keys(this.models);
    for (var i = 0; i < names.length; i++) {
      var modelData = this.models[names[i]];
      var model = modelData(this.sequelize, this.Sequelize.DataTypes);
      this[model.name] = model;
    }

    for (var i = 0; i < names.length; i++) {
      var modelName = names[i];
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    }
  };

  this.connect = function () {
    this.sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        ...config.sequelizeOpts,
        operatorsAliases: this.operatorsAliases,
        benchmark: true,
      }
    );
  };

  this.connect();
  this.associate();
}

export default Models;
