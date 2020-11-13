const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Excercises extends Model { }


Excercises.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vocalPart_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'vocalpart',
              key: 'id'
            }
          },
        exerciseLetter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scaleDirection: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'excercises'
      }
)