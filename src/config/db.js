import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("? Conexi�n a MySQL exitosa");
  } catch (err) {
    console.error("? Error de conexi�n:", err.message);
    process.exit(1);
  }
}
