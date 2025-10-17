import { db, initDB, nextId } from "../db/jsondb.js";

export async function crearVehiculo(data){
  await initDB();
  if (!db.data.duenos.some(d => d.id == data.duenoId)) { const e = new Error("El dueño indicado no existe"); e.status=400; throw e; }
  if (!/^[A-Z]{3}-\d{3,4}$/.test(data.placa || "")) { const e = new Error("Formato de placa inválido (ABC-123 o ABC-1234)"); e.status=400; throw e; }
  if (db.data.vehiculos.some(v => v.placa === data.placa)) { const e = new Error("La placa ya existe"); e.status=400; throw e; }
  const vehiculo = { id: nextId("vehiculos"), ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.data.vehiculos.push(vehiculo);
  await db.write();
  return vehiculo;
}

export async function listarVehiculos(){
  await initDB();
  return db.data.vehiculos
    .map(v => ({ ...v, dueno: db.data.duenos.find(d => d.id == v.duenoId) || null, matricula: db.data.matriculas.find(m => m.vehiculoId == v.id) || null }))
    .sort((a,b)=>b.id-a.id);
}

export async function obtenerVehiculo(id){
  await initDB();
  const v = db.data.vehiculos.find(x => x.id == id);
  if(!v){ const e = new Error("Vehículo no encontrado"); e.status=404; throw e; }
  return { ...v, dueno: db.data.duenos.find(d => d.id == v.duenoId) || null, matricula: db.data.matriculas.find(m => m.vehiculoId == v.id) || null };
}

export async function actualizarVehiculo(id, data){
  await initDB();
  const i = db.data.vehiculos.findIndex(x => x.id == id);
  if(i===-1){ const e = new Error("Vehículo no encontrado"); e.status=404; throw e; }
  if (data.duenoId && !db.data.duenos.some(d => d.id == data.duenoId)) { const e = new Error("El nuevo dueño indicado no existe"); e.status=400; throw e; }
  if (data.placa && (!/^[A-Z]{3}-\d{3,4}$/.test(data.placa) || db.data.vehiculos.some(v => v.placa===data.placa && v.id!=id))) {
    const e = new Error("Placa inválida o duplicada"); e.status=400; throw e;
  }
  db.data.vehiculos[i] = { ...db.data.vehiculos[i], ...data, updatedAt: new Date().toISOString() };
  await db.write();
  return db.data.vehiculos[i];
}

export async function eliminarVehiculo(id){
  await initDB();
  db.data.matriculas = db.data.matriculas.filter(m => m.vehiculoId != id);
  const before = db.data.vehiculos.length;
  db.data.vehiculos = db.data.vehiculos.filter(x => x.id != id);
  if (db.data.vehiculos.length === before){ const e = new Error("Vehículo no encontrado"); e.status=404; throw e; }
  await db.write();
  return true;
}
