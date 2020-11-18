const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Student extends Model {}

Student.init({
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

    vocal_part_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vocal_style: {
        type: DataTypes.STRING,
    },
    grade_level: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    guardian_email: {
        type: DataTypes.STRING,
    },
    room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "student",
});

module.exports = Student;