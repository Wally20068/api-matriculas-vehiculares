import swaggerJsdoc from "swagger-jsdoc";
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Gestión de Matrículas Vehiculares",
      version: "1.0.0",
      description: "Entidad-Servicio-Controlador para Dueños, Vehículos y Matrículas con validaciones."
    },
    servers: [{ url: "http://localhost:3000" }]
  },
  apis: []
});
