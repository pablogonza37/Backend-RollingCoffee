import { Router } from "express";
import {
  borrarTarea,
  crearTarea,
  editarTarea,
  listarTareas,
  obtenerTarea,
} from "../controllers/tareas.controllers.js";
import auth from '../middlewares/auth.js'
import validacionesTarea from "../helpers/validacionTarea.js";

const router = Router();

router.post('/tareas', auth(['usuario', 'admin']), validacionesTarea, crearTarea);
router.get('/tareas', auth(['usuario', 'admin']), listarTareas);
router.get('/tareas/:idTarea', auth(['usuario', 'admin']), obtenerTarea);
router.delete('/tareas/:idTarea', auth(['usuario', 'admin']), borrarTarea);
router.put('/tareas/:idTarea', auth(['usuario', 'admin']), editarTarea);

export default router;
