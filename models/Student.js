const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Student extends Model {}

Student.init(
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
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "teacher",
        key: "id",
      },
    },
    // company_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'company',
    //         key: 'id'
    //     }
    // },
    vocalPartName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    profilePic: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    vocalStyle: {
      type: DataTypes.STRING,
    },
    gradeLevel: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    guardianEmail: {
      type: DataTypes.STRING,
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "student",
  }
);

module.exports = Student;
