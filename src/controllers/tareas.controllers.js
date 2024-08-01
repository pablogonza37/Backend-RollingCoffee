import Tarea from "../database/model/tarea.js";
import Usuario from "../database/model/usuario.js";

import moment from "moment-timezone";

const convertirAHoraArgentina = (fechaUTC) => {
  return moment(fechaUTC)
    .tz("America/Argentina/Buenos_Aires")
    .format("YYYY-MM-DD HH:mm:ss");
};

export const listarTareas = async (req, res) => {
  try {
    if (!req.idUsuario) {
      return res.status(400).json({
        mensaje: "No se ha proporcionado el idUsuario",
      });
    }

    const usuario = await Usuario.findById(req.idUsuario).populate("tareas");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json(usuario.tareas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "No se pudo encontrar la lista de tareas",
    });
  }
};

export const obtenerTarea = async (req, res) => {
  try {
    const id = req.params.idTarea;
    const idUsuario = req.idUsuario;
    const tareaBuscada = await Tarea.findOne({ _id: id, idUsuario: idUsuario });

    if (!tareaBuscada) {
      return res.status(404).json({
        mensaje:
          "No se pudo encontrar la tarea o no tienes permisos para acceder a ella",
      });
    }

    res.status(200).json(tareaBuscada);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar obtener la tarea",
    });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const idUsuario = req.idUsuario;
    const { tarea, realizada, fechaCreacion, fechaActualizacion } = req.body;

    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const nuevaTarea = new Tarea({
      tarea,
      realizada,
      idUsuario,
      fechaCreacion: convertirAHoraArgentina(fechaCreacion),
      fechaActualizacion: convertirAHoraArgentina(fechaActualizacion),
    });

    await nuevaTarea.save();

    usuario.tareas.push(nuevaTarea);
    await usuario.save();

    res.status(201).json({
      mensaje: "La tarea fue creada y asignada correctamente al usuario",
      tarea: nuevaTarea,
    });
  } catch (error) {
    console.error("Error al crear y asignar la tarea:", error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear la tarea",
      error: error.message,
    });
  }
};

export const borrarTarea = async (req, res) => {
  try {
    const idTarea = req.params.idTarea;
    const idUsuario = req.idUsuario;

    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const indice = usuario.tareas.findIndex(
      (tarea) => tarea._id.toString() === idTarea
    );

    if (indice === -1) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada en el array de tareas del usuario",
      });
    }

    usuario.tareas.splice(indice, 1);

    await usuario.save();

    const tarea = await Tarea.findById(idTarea);
    if (!tarea) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada en la colección",
      });
    }

    await Tarea.findByIdAndDelete(idTarea);

    res.status(200).json({
      mensaje: "Tarea eliminada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar eliminar la tarea",
    });
  }
};

export const editarTarea = async (req, res) => {
  function obtenerFechaHora() {
    const ahora = new Date();

    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    const hora = String(ahora.getHours()).padStart(2, "0");
    const minuto = String(ahora.getMinutes()).padStart(2, "0");
    const segundo = String(ahora.getSeconds()).padStart(2, "0");

    return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  try {
    const idTarea = req.params.idTarea;
    const idUsuario = req.idUsuario;
    const { tarea, realizada } = req.body;

    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const indice = usuario.tareas.findIndex(
      (tarea) => tarea._id.toString() === idTarea
    );
    if (indice === -1) {
      return res
        .status(404)
        .json({
          mensaje: "Tarea no encontrada en el array de tareas del usuario",
        });
    }

    if (indice !== -1) {
      usuario.tareas.splice(indice, 1, {
        ...usuario.tareas[indice],
        tarea: tarea || usuario.tareas[indice].tarea,
        realizada: realizada !== undefined ? realizada : usuario.tareas[indice].realizada,
        fechaActualizacion: obtenerFechaHora()
      });
    }

    console.log(usuario)

    await usuario.save();

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      idTarea,
      {
        tarea: tarea,
        realizada: realizada,
        fechaActualizacion: obtenerFechaHora(),
      },
      { new: true }
    );

    if (!tareaActualizada) {
      return res
        .status(404)
        .json({ mensaje: "Tarea no encontrada en la colección" });
    }

    res.status(200).json({
      mensaje: "Tarea actualizada exitosamente",
      tarea: tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar editar la tarea",
    });
  }
};
