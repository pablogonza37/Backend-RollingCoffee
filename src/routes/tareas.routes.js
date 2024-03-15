import { Router } from "express";
import { crearTarea, listarTareas, obtenerTarea, editarTarea } from "../controllers/tareas.controllers.js";

const router = Router();

router.route('/tareas').get(listarTareas).post(crearTarea);
router.route('/tarea/:id').get(obtenerTarea).put(editarTarea)

export default router;