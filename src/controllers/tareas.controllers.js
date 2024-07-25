import Tarea from "../database/model/tarea.js";
import Usuario from "../database/model/usuario.js";

export const listarTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).json(tareas);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar la lista de tareas",
    });
  }
};

export const obtenerTarea = async (req, res) => {
  try {
    const tareaBuscada = await Tarea.findById(req.params.id);
    res.status(200).json(tareaBuscada);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar la tarea",
    });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const { idUsuario } = req.params; // Obtiene el id del usuario de los parámetros de la URL
    const { tarea, realizada } = req.body; // Obtiene los datos de la tarea del cuerpo de la solicitud

    // Busca el usuario por su id
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Crea la nueva tarea
    const nuevaTarea = new Tarea({
      tarea,
      realizada,
      // Otros campos de la tarea según tu modelo de Tarea
    });

    await nuevaTarea.save();

    // Asocia la tarea al usuario
    usuario.tareas.push(nuevaTarea); // Asume que `tareas` es un array de referencias a Tarea en el modelo de Usuario
    await usuario.save();

    res.status(201).json({
      mensaje: "La tarea fue creada y asignada correctamente al usuario",
      tarea: nuevaTarea // Opcional: devolver información sobre la tarea creada
    });
  } catch (error) {
    console.error('Error al crear y asignar la tarea:', error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear la tarea",
      error: error.message // Devuelve el mensaje de error al cliente para depuración
    });
  }
};

export const borrarTarea = async (req, res) => {
  try {
    const buscarTarea = await Tarea.findById(req.params.id);
    if (!buscarTarea) {
      return res.status(404).json({
        mensaje: "No se pudo eliminar la tarea, el id es incorrecto",
      });
    }
    await Tarea.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "La tarea fue eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar editar la tarea",
    });
  }
};

export const editarTarea = async (req, res) => {
  try {
    const buscarTarea = await Tarea.findById(req.params.id);
    if(!buscarTarea){
        return res.status(404).json({
            mensaje: 'No se pudo encontrar la tarea, el id es incorrecto'
        })
    }
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: 'La tarea fue modificada exitosamente'})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar editar la tarea",
    });
  }
};

