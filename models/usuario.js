// const {DataTypes} = require('sequelize');
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const {db} = require("../database/config");

const Usuario = db.define(
  "Usuario",
  {
    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numCuenta: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [19, 19],
      },
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    pass: {
      type: DataTypes.STRING,
    },
    numCelular: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    estado: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    rol: {
      type: DataTypes.ENUM("USER", "ADMIN_USER"),
      defaultValue: "USER",
      allowNull: false,
    },
  },
  { freezeTableName: true,
    timestamps: true
   },
);
module.exports = Usuario;
