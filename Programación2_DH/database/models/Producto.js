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
        imagenUrl: {
            type: dataTypes.STRING,
        }
    }

    let configTabla = {
        tablename: "productos",
        timestamps: true,
        underscorded: false
    }

    let Producto = sequelize.define(alias, columnas, configTabla)

    Producto.associate = (models) => {
        Producto.belongsTo(models.Usuario, {
            as: "usuario_producto",
            foreignKey: "usuario_id"
        })

        Producto.hasMany(models.Comentario, {
            as: "comentario_producto",
            foreignKey: "producto_id"
        })
    }

    return Producto
}