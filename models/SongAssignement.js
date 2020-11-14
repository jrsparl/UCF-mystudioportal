const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { v4: uuidv4 } = require('uuid');

class SongAssignments extends Model {}


SongAssignments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'student',
            key: 'id'
        }
    },
    repertoire_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'repertoire',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'songassignment'
})