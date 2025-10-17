import { db, initDB, nextId } from "../db/jsondb.js";

export async function crearMatricula(data){
  await initDB();
  const vehiculo = db.data.vehiculos.find(v => v.id == data.vehiculoId);
  if(!vehiculo){ const e = new Error("El vehículo indicado no existe"); e.status=400; throw e; }
  if (db.data.matriculas.some(m => m.vehiculoId == data.vehiculoId)) { const e = new Error("El vehículo ya posee una matrícula"); e.status=400; throw e; }
  if (db.data.matriculas.some(m => m.numero === data.numero)) { const e = new Error("El número de matrícula ya existe"); e.status=400; throw e; }
  const em = new Date(data.fechaEmision), ex = new Date(data.fechaExpiracion);
  if (isNaN(em) || isNaN(ex) || em >= ex) { const e = new Error("Fechas inválidas (emisión < expiración)"); e.status=400; throw e; }

  const mat = { id: nextId("matriculas"), estado: data.estado || "activa", ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.data.matriculas.push(mat);
  await db.write();
  return mat;
}

export async function listarMatriculas(){
  await initDB();
  return db.data.matriculas.map(m => ({ ...m, vehiculo: db.data.vehiculos.find(v => v.id == m.vehiculoId) || null })).sort((a,b)=>b.id-a.id);
}

export async function obtenerMatricula(id){
  await initDB();
  const m = db.data.matriculas.find(x => x.id == id);
  if(!m){ const e = new Error("Matrícula no encontrada"); e.status=404; throw e; }
  return { ...m, vehiculo: db.data.vehiculos.find(v => v.id == m.vehiculoId) || null };
}

export async function actualizarMatricula(id, data){
  await initDB();
  const i = db.data.matriculas.findIndex(x => x.id == id);
  if(i===-1){ const e = new Error("Matrícula no encontrada"); e.status=404; throw e; }
  const cur = db.data.matriculas[i];
  if (data.numero && db.data.matriculas.some(x => x.numero===data.numero && x.id!=id)) { const e = new Error("El número de matrícula ya existe"); e.status=400; throw e; }
  const em = new Date(data.fechaEmision || cur.fechaEmision), ex = new Date(data.fechaExpiracion || cur.fechaExpiracion);
  if (isNaN(em) || isNaN(ex) || em >= ex) { const e = new Error("Fechas inválidas"); e.status=400; throw e; }
  if (data.vehiculoId && data.vehiculoId != cur.vehiculoId) {
    const exists = db.data.vehiculos.some(v => v.id == data.vehiculoId);
    if (!exists) { const e = new Error("El vehículo indicado no existe"); e.status=400; throw e; }
    if (db.data.matriculas.some(m => m.vehiculoId == data.vehiculoId)) { const e = new Error("El nuevo vehículo ya tiene matrícula"); e.status=400; throw e; }
  }
  db.data.matriculas[i] = { ...cur, ...data, updatedAt: new Date().toISOString() };
  await db.write();
  return db.data.matriculas[i];
}

export async function eliminarMatricula(id){
  await initDB();
  const before = db.data.matriculas.length;
  db.data.matriculas = db.data.matriculas.filter(x => x.id != id);
  if (db.data.matriculas.length === before){ const e = new Error("Matrícula no encontrada"); e.status=404; throw e; }
  await db.write();
  return true;
}
