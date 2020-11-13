const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class VocalPart extends Model { }


VocalPart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vocalPartName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'vocalpart'
      }
)