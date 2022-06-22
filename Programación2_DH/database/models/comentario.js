module.exports = (sequelize, dataTypes) => {

    let alias = "Comentario"

    let columnas = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER,
        },
        texto: {
            type: dataTypes.STRING,
        }
    }

    let configTabla = {
        tablename: "comentarios",
        timestamps: true,
        underscorded: true,
    }

    let Comentario = sequelize.define(alias, columnas, configTabla)

    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Producto, {
            as: "producto_comentario",
            foreignKey: "producto_id"
        })

        Comentario.belongsTo(models.Usuario, {
            as: "usuario_comentario",
            foreignKey: "user_id"
        })
    }

    return Comentario
}