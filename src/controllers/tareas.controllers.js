import Tarea from '../database/model/tarea.js'

export const listarTareas = (req, res)=>{
    console.log('desde listar tareas');
    res.send('enviar lista de tareas...')
}