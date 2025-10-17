import { Router } from "express";
import * as ctrl from "../controllers/vehiculoController.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
const r = Router();

r.get("/", ctrl.listar);
r.get("/:id", param("id").isInt(), validateRequest, ctrl.obtener);
r.post("/",
  body("placa").matches(/^[A-Z]{3}-\d{3,4}$/),
  body("marca").notEmpty(),
  body("modelo").notEmpty(),
  body("anio").isInt({min:1950,max:2100}),
  body("duenoId").isInt(),
  validateRequest, ctrl.crear);
r.put("/:id",
  param("id").isInt(),
  body("placa").optional().matches(/^[A-Z]{3}-\d{3,4}$/),
  body("anio").optional().isInt({min:1950,max:2100}),
  body("duenoId").optional().isInt(),
  validateRequest, ctrl.actualizar);
r.delete("/:id", param("id").isInt(), validateRequest, ctrl.eliminar);

export default r;
