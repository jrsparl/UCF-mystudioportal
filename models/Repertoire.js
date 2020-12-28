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
      allowNull: true,
    },
    song_writer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
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
