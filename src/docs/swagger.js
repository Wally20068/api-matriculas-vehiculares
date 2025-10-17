import swaggerJsdoc from "swagger-jsdoc";
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Gesti�n de Matr�culas Vehiculares",
      version: "1.0.0",
      description: "Entidad-Servicio-Controlador para Due�os, Veh�culos y Matr�culas con validaciones."
    },
    servers: [{ url: "http://localhost:3000" }]
  },
  apis: []
});
