const { DataTypes } = require('sequelize');
const db = require('../db');

const CursoModel = db.define('curso', {
  id_curso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'nivel', // Asegúrate de que 'nivel' sea el nombre correcto de la tabla relacionada
      key: 'id_nivel',
    },
  },
}, {
  timestamps: false, // Si no necesitas timestamps
  tableName: 'curso', // Asegura que coincida con el nombre de la tabla en la base de datos
});

module.exports = { CursoModel };
