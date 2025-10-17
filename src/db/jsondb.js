import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const defaultData = { duenos: [], vehiculos: [], matriculas: [] };
const file = "data/db.json";

// 1) Garantiza carpeta
if (!existsSync("data")) mkdirSync("data", { recursive: true });

// 2) Valida/auto-repara el archivo ANTES de que lowdb lo lea
function ensureValidJSON() {
  try {
    if (!existsSync(file)) {
      writeFileSync(file, JSON.stringify(defaultData, null, 2), "utf8");
      return;
    }
    const raw = readFileSync(file, "utf8");
    JSON.parse(raw); // si falla, reescribimos
    // si está vacío o solo espacios, también reescribe
    if (!raw.trim()) writeFileSync(file, JSON.stringify(defaultData, null, 2), "utf8");
  } catch (_e) {
    writeFileSync(file, JSON.stringify(defaultData, null, 2), "utf8");
  }
}
ensureValidJSON();

// 3) Construye lowdb con defaultData
const adapter = new JSONFile(file);
export const db = new Low(adapter, defaultData);

// 4) Inicializa con fallback
export async function initDB() {
  await db.read().catch(() => {});
  db.data ||= { ...defaultData };
  await db.write().catch(() => {});
}

// 5) Generador de IDs incrementales
export function nextId(collection) {
  const arr = db.data[collection] || [];
  return arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1;
}
