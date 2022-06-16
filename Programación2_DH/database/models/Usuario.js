module.exports = (sequelize,dataTypes) => {

    let alias = "Usuario"

    let columnas = {
        id: {
            type: dataTypes.INTEGER, // INTEGER = entero
            primaryKey: true,
            autoIncrement: true,
        },
        nombreDeUsuario: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        contrasenia: {
            type: dataTypes.STRING,
        },
        fechaDeNacimiento: {
            type: dataTypes.DATE,
        }
    }

    let configTabla = {
        tablename: "usuarios",
        timestamps: true,
        underscorded: false
    }

    let Usuario = sequelize.define(alias,columnas,configTabla)

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Producto, {
            as: "producto_usuario",
            foreignKey: "usuario_id"
        })

        Usuario.hasMany(models.Comentario, {
            as: "comentario_usuario",
            foreignKey: "usuario_id"
        })
    }

    return Usuario
}