import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import { sequelize } from "../config/db.js";
import "../models/index.js"; // registra modelos y asociaciones

// Crea la base si no existe (sin mysql.exe, vía mysql2)
async function ensureDatabase() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
  const conn = await mysql.createConnection({
    host: DB_HOST || "localhost",
    port: Number(DB_PORT || 3306),
    user: DB_USER,
    password: DB_PASS
  });
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  );
  await conn.end();
  console.log(`? BD '${process.env.DB_NAME}' creada/verificada`);
}

// Sincroniza modelos -> crea/ajusta tablas
async function syncModels() {
  const force = String(process.env.SYNC_FORCE || "").toLowerCase() === "true";
  const alter = !force;
  await sequelize.sync({ force, alter });
  console.log(\`? Tablas sincronizadas (force=\${force}, alter=\${alter})\`);
  await sequelize.close();
}

(async () => {
  try {
    await ensureDatabase();
    await syncModels();
    console.log("?? Listo: BD y tablas creadas desde VS Code (sin Workbench)");
    process.exit(0);
  } catch (err) {
    console.error("? Error en syncDB:", err);
    process.exit(1);
  }
})();
