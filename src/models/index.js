import { Dueno } from "./Dueno.js";
import { Vehiculo } from "./Vehiculo.js";
import { Matricula } from "./Matricula.js";

Dueno.hasMany(Vehiculo, { foreignKey: "duenoId", as: "vehiculos", onDelete: "RESTRICT" });
Vehiculo.belongsTo(Dueno, { foreignKey: "duenoId", as: "dueno" });

Vehiculo.hasOne(Matricula, { foreignKey: "vehiculoId", as: "matricula", onDelete: "CASCADE" });
Matricula.belongsTo(Vehiculo, { foreignKey: "vehiculoId", as: "vehiculo" });

export { Dueno, Vehiculo, Matricula };
