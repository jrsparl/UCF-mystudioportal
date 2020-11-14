const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { v4: uuidv4 } = require("uuid");

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
        },
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "teacher",
            key: "id",
        },
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "student",
            key: "id",
        },
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
});

module.exports = Comment;