import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  imagenPerfil: {
    type: String,
    default: "https://res.cloudinary.com/dpgb6ec2s/image/upload/v1723685199/images_c9maxo.png",
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    validator: (value) => {
      const pattern =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    },
  },

  contrasenia: {
    type: String,
    required: true,
    trim: true,
  },

  rol: {
    type: String,
    default: "usuario",
  },

  habilitado: {
    type: Boolean,
    default: true,
  },
  
  genero: {
    type: String,
    required: true,
  },

  fechaNacimiento: {
    type: String,
    required: true,
  },
  tareas: [],
});

UsuarioSchema.methods.toJSON = function () {
  const { contrasenia, __v, tareas, ...usuario } = this.toObject();
  return usuario;
};

const Usuario = mongoose.model("usuario", UsuarioSchema);
export default Usuario;
