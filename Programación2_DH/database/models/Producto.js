module.exports = (sequelize, dataTypes) => {

    let alias = "Producto"

    let columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modelo: {
            type: dataTypes.STRING,
        },
        descripcion: {
            type: dataTypes.STRING,
        },
        imagen_url: {
            type: dataTypes.STRING,
        },
        user_id: {
            type: dataTypes.INTEGER,
        }
    }

    let configTabla = {
        tablename: "productos",
        timestamps: true,
        underscorded: true,
    }

    let Producto = sequelize.define(alias, columnas, configTabla)

    Producto.associate = (models) => {
        Producto.belongsTo(models.Usuario, {
            as: "usuario_producto",
            foreignKey: "user_id"
        })

        Producto.hasMany(models.Comentario, {
            as: "comentario_producto",
            foreignKey: "producto_id"
        })
    }

    return Producto
}