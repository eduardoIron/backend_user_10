const {DataTypes } = require("sequelize");
const {db} = require("../database/config");
const Usuario = require("./usuario");

const Bitacora = db.define(
    "Bitacora",
    {
        accion:{
            type: DataTypes.TEXT,
            allowNull: false,

        },
        id_usuario:{
            type: DataTypes.INTEGER,
            references:{
                model:Usuario,
                key:'id'
            }
        },
    },
    {freezeTableName: true,
    timestamps: true},
);

Bitacora.belongsTo(Usuario,{foreignKey:'id_usuario'});
module.exports = Bitacora;