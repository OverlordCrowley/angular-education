const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  image: { type: DataTypes.STRING, unique: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  pass: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  User
}
;
