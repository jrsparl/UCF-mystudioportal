const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Teacher extends Model {}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
   
    birthday: {
      type: DataTypes.DATE,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "empty-profilepic.png",
    },
    coaching_genre: {
      type: DataTypes.STRING,
    },
    coaching_level: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "teacher",
  }
);

module.exports = Teacher;
