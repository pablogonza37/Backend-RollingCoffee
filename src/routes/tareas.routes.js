import { Router } from "express";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  editarTarea,
  borrarTarea,
} from "../controllers/tareas.controllers.js";

const router = Router();

router.route("/tareas").get(listarTareas).post(crearTarea);
router.route("/tareas/:id").get(obtenerTarea).delete(borrarTarea).put(editarTarea);

export default router;
