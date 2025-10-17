import { Router } from "express";
import * as ctrl from "../controllers/duenoController.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
const r = Router();

r.get("/", ctrl.listar);
r.get("/:id", param("id").isInt(), validateRequest, ctrl.obtener);
r.post("/", 
  body("nombres").notEmpty(),
  body("apellidos").notEmpty(),
  body("cedula").matches(/^\d{10}$/),
  body("direccion").notEmpty(),
  body("email").optional().isEmail(),
  validateRequest, ctrl.crear);
r.put("/:id",
  param("id").isInt(),
  body("cedula").optional().matches(/^\d{10}$/),
  body("email").optional().isEmail(),
  validateRequest, ctrl.actualizar);
r.delete("/:id", param("id").isInt(), validateRequest, ctrl.eliminar);

export default r;
