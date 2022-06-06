import { Router } from "express";
import { check } from "express-validator";
import {
   registerLog,
   getLogs,
   getUserToApp,
} from "../controllers/loginTime.controller";
import { validarCampos } from "../middlewares/validar-campos";

const router = new Router();

router.post(
   "/new",
   [
      check("user_id_app", "User id es requerido").not().isEmpty(),
      check("user_name_app", "Name user es requerido").not().isEmpty(),
      check("client_id_app", "Client id es requerido").not().isEmpty(),
      check("ruc_app", "Ruc es requerido").not().isEmpty(),
      check("client_name_app", "Client name es requerido").not().isEmpty(),
      validarCampos,
   ],
   registerLog
);

router.post(
   "/list",
   [
      check("start", "Fecha inicio es requerido").not().isEmpty(),
      check("end", "Fecha fin es requerido").not().isEmpty(),
      validarCampos,
   ],
   getLogs
);

router.post(
   "/users_app",
   [check("ruc", "Ruc es requerido").not().isEmpty(), validarCampos],
   getUserToApp
);

export default router;
