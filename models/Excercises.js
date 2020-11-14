const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Excercises extends Model {}


Excercises.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    vocal_part_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'vocalpart',
            key: 'id'
        }
    },
    exercise_letter: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scale_direction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'excercises'
})