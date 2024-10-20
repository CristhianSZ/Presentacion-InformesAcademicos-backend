const { DataTypes } = require('sequelize');
const db = require('../db'); // Asegúrate de importar tu configuración de Sequelize
const { ProvinciaModel } = require('./Provincia');

const LocalidadModel = db.define('localidad', {
  id_localidad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_provincia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ProvinciaModel, // Establecer la relación con el modelo de Provincia
      key: 'id_provincia',
    }
  }
}, {
  timestamps: false,
  tableName: 'localidad',
});

// Establecer la relación
LocalidadModel.belongsTo(ProvinciaModel, { foreignKey: 'id_provincia', as: 'provincia' });

module.exports = { LocalidadModel };
