import { Router } from "express";
import * as ctrl from "../controllers/matriculaController.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
const r = Router();

r.get("/", ctrl.listar);
r.get("/:id", param("id").isInt(), validateRequest, ctrl.obtener);
r.post("/",
  body("numero").notEmpty(),
  body("fechaEmision").isISO8601(),
  body("fechaExpiracion").isISO8601(),
  body("estado").optional().isIn(["activa","vencida","anulada"]),
  body("vehiculoId").isInt(),
  validateRequest, ctrl.crear);
r.put("/:id",
  param("id").isInt(),
  body("numero").optional().notEmpty(),
  body("fechaEmision").optional().isISO8601(),
  body("fechaExpiracion").optional().isISO8601(),
  body("estado").optional().isIn(["activa","vencida","anulada"]),
  body("vehiculoId").optional().isInt(),
  validateRequest, ctrl.actualizar);
r.delete("/:id", param("id").isInt(), validateRequest, ctrl.eliminar);

export default r;
