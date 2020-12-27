const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Repertoire extends Model {}

Repertoire.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "company",
        key: "id",
      },
    },
    song_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song_writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "repertoire",
  }
);

module.exports = Repertoire;
