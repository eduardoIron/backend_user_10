const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const Usuario = require("./usuario");

const Bitacora = db.define(
    "Bitacora",
    {
        accion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

Bitacora.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Bitacora;