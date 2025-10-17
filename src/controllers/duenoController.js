import * as service from "../services/duenoService.js";
export const crear=async(req,res,next)=>{try{res.status(201).json(await service.crearDueno(req.body));}catch(e){next(e);}};
export const listar=async(_req,res,next)=>{try{res.json(await service.listarDuenos());}catch(e){next(e);}};
export const obtener=async(req,res,next)=>{try{res.json(await service.obtenerDueno(req.params.id));}catch(e){next(e);}};
export const actualizar=async(req,res,next)=>{try{res.json(await service.actualizarDueno(req.params.id,req.body));}catch(e){next(e);}};
export const eliminar=async(req,res,next)=>{try{await service.eliminarDueno(req.params.id);res.status(204).send();}catch(e){next(e);}};
