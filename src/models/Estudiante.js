const { DataTypes } = require('sequelize');
const db = require('../db');

const EstudianteModel = db.define('estudiante', {
  id_estudiante: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DNI: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  direccion_calle: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  calle_numero: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  grupo_sanguineo: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cuil: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  estado: {  // Nuevo atributo agregado
    type: DataTypes.STRING,  // Tipo VARCHAR en la base de datos
    allowNull: false,       // O puedes usar true si es opcional
    defaultValue: 'activo', // Valor por defecto si es necesario
  },
  id_provincia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'provincia', // Debe coincidir con el nombre de la tabla provincias
      key: 'id_provincia',
    }
  },
  id_localidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'localidad', // Debe coincidir con el nombre de la tabla localidades
      key: 'id_localidad',
    }
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'curso', // Debe coincidir con el nombre de la tabla cursos
      key: 'id_curso',
    }
  }
}, {
  timestamps: false,
  tableName: 'estudiante', // Asegura que coincida con el nombre de la tabla
});

module.exports = { EstudianteModel };
