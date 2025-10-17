import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Vehiculo extends Model {}

Vehiculo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    placa: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
      validate: { is: /^[A-Z]{3}-\d{3,4}$/ },
    },
    marca: { type: DataTypes.STRING(40), allowNull: false },
    modelo: { type: DataTypes.STRING(40), allowNull: false },
    anio: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1950, max: 2100 } },
    color: { type: DataTypes.STRING(25) },
    duenoId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Vehiculo", tableName: "vehiculos", timestamps: true }
);
