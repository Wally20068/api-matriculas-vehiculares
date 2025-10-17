import * as service from "../services/vehiculoService.js";
export const crear=async(req,res,next)=>{try{res.status(201).json(await service.crearVehiculo(req.body));}catch(e){next(e);}};
export const listar=async(_req,res,next)=>{try{res.json(await service.listarVehiculos());}catch(e){next(e);}};
export const obtener=async(req,res,next)=>{try{res.json(await service.obtenerVehiculo(req.params.id));}catch(e){next(e);}};
export const actualizar=async(req,res,next)=>{try{res.json(await service.actualizarVehiculo(req.params.id,req.body));}catch(e){next(e);}};
export const eliminar=async(req,res,next)=>{try{await service.eliminarVehiculo(req.params.id);res.status(204).send();}catch(e){next(e);}};
