import Tarea from "../database/model/tarea.js";

export const listarTareas = async (req, res) => {
    try{
        const tareas = await Tarea.find();
        res.status(200).json(tareas)
    }catch (error){
        console.log(error);
        res.status(404).json({
            mensaje: "No se pudo encontrar la lista de tareas",
          });
    }
  
};

export const crearTarea = async (req, res) => {
  try {
    const tareaNueva = new Tarea(req.body);
    await tareaNueva.save();
    res.status(201).json({
      mensaje: "La tarea fue creada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear la tarea",
    });
  }
};
