const { DataTypes } = require('sequelize');
const db = require('../db'); // Asegúrate de importar tu configuración de Sequelize

const ProvinciaModel = db.define('provincia', {
  id_provincia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'provincia',
});

module.exports = { ProvinciaModel };
