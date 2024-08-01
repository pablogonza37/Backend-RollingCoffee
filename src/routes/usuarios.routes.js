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
import auth from '../middlewares/auth.js'

const router = Router();

router.post('/usuarios', auth(['admin']), [validacionesUsuario], crearUsuario);
router.get('/usuarios', auth(['admin']), listarUsuarios);
router.get('/usuarios/:idUsuario', auth(['admin']), obtenerUsuario);
router.delete('/usuarios/:idUsuario', auth(['admin']), borrarUsuario);
router.put('/suspender/:idUsuario', auth(['admin']), suspenderUsuario);
router.put('/levantar-suspension/:idUsuario', auth(['admin']), levantarSuspensionUsuario);
router.post('/login', login);


export default router;