import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Dueno extends Model {}

Dueno.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombres: { type: DataTypes.STRING(80), allowNull: false },
    apellidos: { type: DataTypes.STRING(80), allowNull: false },
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: { is: /^\d{10}$/ },
    },
    direccion: { type: DataTypes.STRING(120), allowNull: false },
    telefono: { type: DataTypes.STRING(15) },
    email: { type: DataTypes.STRING(120), validate: { isEmail: true } },
  },
  { sequelize, modelName: "Dueno", tableName: "duenos", timestamps: true }
);
