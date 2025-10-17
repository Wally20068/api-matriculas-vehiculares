import { db, initDB, nextId } from "../db/jsondb.js";

export async function crearDueno(data){
  await initDB();
  if (!/^\d{10}$/.test(data.cedula || "")) { const e = new Error("cedula debe tener 10 dígitos"); e.status=400; throw e; }
  if (db.data.duenos.some(d => d.cedula === data.cedula)) { const e = new Error("La cédula ya existe"); e.status=400; throw e; }
  const dueno = { id: nextId("duenos"), ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.data.duenos.push(dueno);
  await db.write();
  return dueno;
}

export async function listarDuenos(){ await initDB(); return [...db.data.duenos].sort((a,b)=>b.id-a.id); }

export async function obtenerDueno(id){
  await initDB();
  const d = db.data.duenos.find(x => x.id == id);
  if(!d){ const e = new Error("Dueño no encontrado"); e.status=404; throw e; }
  return d;
}

export async function actualizarDueno(id, data){
  await initDB();
  const i = db.data.duenos.findIndex(x => x.id == id);
  if(i===-1){ const e = new Error("Dueño no encontrado"); e.status=404; throw e; }
  if (data.cedula && (!/^\d{10}$/.test(data.cedula) || db.data.duenos.some(x => x.cedula===data.cedula && x.id!=id))) {
    const e = new Error("Cédula inválida o duplicada"); e.status=400; throw e;
  }
  db.data.duenos[i] = { ...db.data.duenos[i], ...data, updatedAt: new Date().toISOString() };
  await db.write();
  return db.data.duenos[i];
}

export async function eliminarDueno(id){
  await initDB();
  if (db.data.vehiculos.some(v => v.duenoId == id)) { const e = new Error("No se puede eliminar: dueño tiene vehículos"); e.status=400; throw e; }
  const before = db.data.duenos.length;
  db.data.duenos = db.data.duenos.filter(x => x.id != id);
  if (db.data.duenos.length === before){ const e = new Error("Dueño no encontrado"); e.status=404; throw e; }
  await db.write();
  return true;
}
