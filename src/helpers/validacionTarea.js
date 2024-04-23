import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesTarea = [
  check("tarea")
    .notEmpty()
    .withMessage("La tarea es requerida")
    .isLength({ min: 3, max: 40 })
    .withMessage("La tarea debe tener entre 3 y 40 caracteres"),
  check("realizada")
    .notEmpty()
    .withMessage("Realizada es un dato requerido")
    .isBoolean()
    .withMessage("realizada debe ser un dato booleano"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesTarea;