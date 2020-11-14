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
    // company_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "company",
    //     key: "id",
    //   },
    // },
    birthday: {
      type: DataTypes.DATE,
    },
    profilePic: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    coachingGenre: {
      type: DataTypes.STRING,
    },
    coachingLevel: {
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
