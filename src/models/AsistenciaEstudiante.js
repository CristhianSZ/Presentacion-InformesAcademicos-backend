const {DataTypes} = require('sequelize');
const db = require("../db.js");

const AsistenciaEstudianteModel = db.define('asistencia_alumno', {
    id_asistencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {  
        type: DataTypes.STRING,  
        allowNull: false,       
        defaultValue: 'activo', 
      },
}, {
    timestamps: false,
    tableName: 'asistencia_alumno'
})
module.exports = {AsistenciaEstudianteModel};