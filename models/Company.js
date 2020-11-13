const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Company extends Model {}


Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          company_logo: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
          },
          street_address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          zipCode:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [4]
            }
          }
        },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'company'
          }
)