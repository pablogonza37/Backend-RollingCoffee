import Usuario  from "../database/model/usuario.js";
import Tarea from "../database/model/tarea.js"
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";
import cloudinary from '../helpers/cloudinary.js';
import registroUsuario from '../helpers/mensaje.js'

export const crearUsuario = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const emailValidacion = await Usuario.findOne({ email });
    if (emailValidacion) {
      return res.status(400).json({
        mensaje: "Este correo ya se encuentra registrado.",
      });
    }
    const saltos = bcrypt.genSaltSync(10);
    const passEncriptada = bcrypt.hashSync(contrasenia, saltos);
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.contrasenia = passEncriptada;
    const tarea = new Tarea({idUsuario: nuevoUsuario._id})
    nuevoUsuario.idTarea = tarea._id
    await nuevoUsuario.save();

    const token = await generarJWT(nuevoUsuario._id, nuevoUsuario.email, nuevoUsuario.rol, nuevoUsuario.habilitado);
    
    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      email: nuevoUsuario.email,
      nombreUsuario: nuevoUsuario.nombreUsuario,
      rol: nuevoUsuario.rol,
      habilitado: nuevoUsuario.habilitado,
      token: token,
      idUsuario: nuevoUsuario._id
    });

    registroUsuario(nuevoUsuario.nombreUsuario, nuevoUsuario.email)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar crear un usuario.",
    });
  }
};


export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar la lista de usuarios",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.idUsuario);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar el usuario",
    });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "No se pudo eliminar el usuario, el id es incorrecto",
      });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "El usuario fue eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar eliminar el usuario",
    });
  }
};

export const suspenderUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    usuario.habilitado = false;
    await usuario.save();
    res.status(200).json({ mensaje: "Usuario suspendido correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al suspender usuario" });
  }
};

export const levantarSuspensionUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    usuario.habilitado = true;
    await usuario.save();
    res
      .status(200)
      .json({ mensaje: "Suspensión del usuario levantada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al levantar suspensión del usuario" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, nombreUsuario, contrasenia } = req.body;

    if (!email && !nombreUsuario) {
      return res.status(400).json({
        mensaje: "Se requiere email o nombre de usuario.",
      });
    }

    const query = email ? { email } : { nombreUsuario };
    const usuarioBuscado = await Usuario.findOne(query);

    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Correo o nombre de usuario o contraseña incorrecto.",
      });
    }

    const contraseniaValido = bcrypt.compareSync(
      contrasenia,
      usuarioBuscado.contrasenia
    );
    if (!contraseniaValido) {
      return res.status(400).json({
        mensaje: "Correo o nombre de usuario o contraseña incorrecto.",
      });
    }

    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email, usuarioBuscado.rol, usuarioBuscado.habilitado);

    res.status(200).json({
      mensaje: "Inicio de sesión correctamente",
      nombreUsuario: usuarioBuscado.nombreUsuario,
      email: usuarioBuscado.email,
      token: token,
      rol: usuarioBuscado.rol,
      habilitado: usuarioBuscado.habilitado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar loguear un usuario.",
    });
  }
};



export const agregarImagenPerfil = async(req, res) => {
  try {
    
      const usuario = await Usuario.findOne({_id: req.idUsuario})
      const resultado = await cloudinary.uploader.upload(req.file.path)
    
      usuario.imagenPerfil = resultado.secure_url
      const result = await usuario.save()


   
      return res.status(200).json({msg:'Se agrego la imagen correctamente'})
    
    
  } catch (error) {
    console.log(error)
  }
}
