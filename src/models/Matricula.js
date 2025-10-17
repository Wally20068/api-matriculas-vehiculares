import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Matricula extends Model {}

Matricula.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    fechaEmision: { type: DataTypes.DATEONLY, allowNull: false },
    fechaExpiracion: { type: DataTypes.DATEONLY, allowNull: false },
    estado: { type: DataTypes.ENUM("activa", "vencida", "anulada"), allowNull: false, defaultValue: "activa" },
    vehiculoId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  { sequelize, modelName: "Matricula", tableName: "matriculas", timestamps: true }
);
