export default (sequelize, DataTypes) => {
  const Clinic = sequelize.define(
    "Clinic",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(191), allowNull: false },
      logo: { type: DataTypes.STRING(191), allowNull: false },
      primaryColor: { type: DataTypes.STRING(191), allowNull: false },
      secondaryColor: { type: DataTypes.STRING(191), allowNull: false },
      location: { type: DataTypes.STRING(191), allowNull: false },
      config: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "clinics",
    }
  );

  Clinic.prototype.getBrand = function () {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      config: this.config,
    };
  };

  return Clinic;
};
