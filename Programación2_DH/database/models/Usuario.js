module.exports = (sequelize,dataTypes) => {

    let alias = "Usuario"

    let columnas = {
        id: {
            type: dataTypes.INTEGER, // INTEGER = entero
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_de_usuario: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        contrasenia: {
            type: dataTypes.STRING,
        },
        fecha_de_nacimiento: {
            type: dataTypes.DATE,
        }
    }

    let configTabla = {
        tablename: "usuarios",
        timestamps: true,
        underscorded: true,
    }

    let Usuario = sequelize.define(alias,columnas,configTabla)

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Producto, {
            as: "producto_usuario",
            foreignKey: "user_id" // usuario_id == user_id
        })

        Usuario.hasMany(models.Comentario, {
            as: "comentario_usuario",
            foreignKey: "user_id" // usuario_id == user_id
        })
    }

    return Usuario
}