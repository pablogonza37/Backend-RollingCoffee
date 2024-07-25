import { Router } from "express";
import {
  crearUsuario,
  login,
  listarUsuarios,
  obtenerUsuario,
  borrarUsuario,
  suspenderUsuario,
  levantarSuspensionUsuario
} from "../controllers/usuarios.controllers.js";
import validacionesUsuario from "../helpers/validacionUsuario.js";
import validarJWT from "../helpers/verificarJWT.js";
import { crearTarea } from "../controllers/tareas.controllers.js";

const router = Router();

router.route("/usuarios").post([validacionesUsuario], crearUsuario).get(listarUsuarios);
router.route("/usuarios/:idUsuario").get(obtenerUsuario).delete(borrarUsuario);
router.route('/suspender/:idUsuario').put(suspenderUsuario);
router.route('/levantar-suspension/:idUsuario').put(levantarSuspensionUsuario);
router.route("/login").post(login);
router.route("/usuarios/:idUsuario").post(crearTarea)

export default router;