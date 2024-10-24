const { DataTypes } = require('sequelize');
const db = require('../db');

const NivelModel = db.define('nivel', {
  id_nivel: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50), // Asegúrate de que la longitud coincida con la definición de la tabla
    allowNull: false,
  },
}, {
  timestamps: false, // Desactivar timestamps si no son necesarios
  tableName: 'nivel', // Asegúrate de que coincida con el nombre de la tabla en la base de datos
});

module.exports = { NivelModel };
