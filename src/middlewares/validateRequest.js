import { validationResult } from "express-validator";
export function validateRequest(req,_res,next){
  const result = validationResult(req);
  if(!result.isEmpty()){
    const err = new Error("Validación fallida");
    err.status = 400;
    err.details = result.array().map(e => ({ field: e.param, message: e.msg }));
    return next(err);
  }
  next();
}
