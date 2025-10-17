import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import duenoRoutes from "./routes/duenoRoutes.js";
import vehiculoRoutes from "./routes/vehiculoRoutes.js";
import matriculaRoutes from "./routes/matriculaRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { verifyToken } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { openapi } from "./docs/openapi.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔓 Rutas públicas (solo login y registro)
app.use("/api/auth", authRoutes);

// 🔒 Rutas protegidas con token JWT
app.use("/api/duenos", verifyToken, duenoRoutes);
app.use("/api/vehiculos", verifyToken, vehiculoRoutes);
app.use("/api/matriculas", verifyToken, matriculaRoutes);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Ruta base
app.get("/", (_req, res) => res.json({ ok: true, name: "API Matrículas Vehiculares" }));

// Manejador de errores
app.use(errorHandler);

export default app;
