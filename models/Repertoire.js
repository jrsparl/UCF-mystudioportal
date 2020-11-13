const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Repertoire extends Model { }


Repertoire.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'company',
              key: 'id'
            }
          },
        songName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        songWritter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        albumName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'repertoire'
      }
)