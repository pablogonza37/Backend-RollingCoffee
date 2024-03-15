import { Router } from "express";
import { listarTareas } from "../controllers/tareas.controllers.js";

const router = Router();

router.route('/tareas').get(listarTareas);

export default router;