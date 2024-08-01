import Tarea from "../database/model/tarea.js";
import Usuario from "../database/model/usuario.js";

export const listarTareas = async (req, res) => {
  try {
    // Verifica que req.idUsuario esté definido
    if (!req.idUsuario) {
      return res.status(400).json({
        mensaje: "No se ha proporcionado el idUsuario",
      });
    }

    // Busca el usuario por idUsuario
    const usuario = await Usuario.findById(req.idUsuario).populate('tareas');

    // Verifica si el usuario fue encontrado
    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    // Envía las tareas asociadas al usuario
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
    const id = req.params.id; // id de la tarea
    const idUsuario = req.idUsuario; // id del usuario (o puedes obtenerlo de req.user si está autenticado)
    // Busca la tarea que coincida con ambos el id de la tarea y el id del usuario
    const tareaBuscada = await Tarea.findOne({ _id: id, idUsuario: idUsuario });

    if (!tareaBuscada) {
      return res.status(404).json({
        mensaje: "No se pudo encontrar la tarea o no tienes permisos para acceder a ella",
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
    const idUsuario = req.idUsuario; // Obtiene el id del usuario de los parámetros de la URL
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
      idUsuario
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
    const idTarea = req.params.id;
    const idUsuario = req.idUsuario;

    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    console.log('Tareas del usuario:', usuario.tareas);

    // Encuentra el índice del objeto en el array de tareas del usuario
    const indice = usuario.tareas.findIndex(tarea => tarea._id.toString() === idTarea);

    if (indice === -1) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada en el array de tareas del usuario",
      });
    }

    // Usa splice para eliminar la tarea del array
    usuario.tareas.splice(indice, 1);

    await usuario.save();

    // Verifica si la tarea existe antes de eliminarla
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
  try {
    const idTarea = req.params.id; // ID de la tarea que se desea editar
    const idUsuario = req.idUsuario; // ID del usuario que está editando la tarea
    const { tarea, realizada } = req.body; // Datos nuevos para la tarea

    // Encuentra el usuario
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Encuentra el índice de la tarea en el array de tareas del usuario
    const indice = usuario.tareas.findIndex(tarea => tarea._id.toString() === idTarea);
    if (indice === -1) {
      return res.status(404).json({ mensaje: "Tarea no encontrada en el array de tareas del usuario" });
    }

    // Actualiza la tarea en el array del usuario
    usuario.tareas[indice].tarea = tarea || usuario.tareas[indice].tarea;
    usuario.tareas[indice].realizada = realizada !== undefined ? realizada : usuario.tareas[indice].realizada;

    // Guarda los cambios en el usuario
    await usuario.save();

    // Actualiza la tarea en la colección de tareas si es necesario
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      idTarea,
      { tarea: tarea, realizada: realizada },
      { new: true } // Devuelve el documento actualizado
    );

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada en la colección" });
    }

    res.status(200).json({
      mensaje: "Tarea actualizada exitosamente",
      tarea: tareaActualizada
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar editar la tarea",
    });
  }
};

