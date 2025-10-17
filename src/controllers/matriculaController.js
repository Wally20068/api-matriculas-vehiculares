import * as service from "../services/matriculaService.js";
export const crear=async(req,res,next)=>{try{res.status(201).json(await service.crearMatricula(req.body));}catch(e){next(e);}};
export const listar=async(_req,res,next)=>{try{res.json(await service.listarMatriculas());}catch(e){next(e);}};
export const obtener=async(req,res,next)=>{try{res.json(await service.obtenerMatricula(req.params.id));}catch(e){next(e);}};
export const actualizar=async(req,res,next)=>{try{res.json(await service.actualizarMatricula(req.params.id,req.body));}catch(e){next(e);}};
export const eliminar=async(req,res,next)=>{try{await service.eliminarMatricula(req.params.id);res.status(204).send();}catch(e){next(e);}};
