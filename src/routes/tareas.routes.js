import { Router } from "express";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  editarTarea,
  borrarTarea,
} from "../controllers/tareas.controllers.js";
import validacionesTarea from "../helpers/validacionTarea.js";

const router = Router();

router.route("/tareas").get(listarTareas).post([validacionesTarea], crearTarea);
router.route("/tareas/:id").get(obtenerTarea).delete(borrarTarea).put([validacionesTarea], editarTarea);

export default router;
