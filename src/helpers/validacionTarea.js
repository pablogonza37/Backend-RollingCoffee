import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesTarea = [
  
  check("tarea")
    .notEmpty()
    .withMessage("La tarea es requerida")
    .isLength({ min: 3, max: 100 })
    .withMessage("La tarea debe tener entre 3 y 100 caracteres"),
 
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesTarea;