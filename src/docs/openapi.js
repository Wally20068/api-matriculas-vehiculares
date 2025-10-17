export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "API Gestión de Matrículas Vehiculares",
    version: "1.0.0",
    description:
      "Entidad-Servicio-Controlador para Dueños, Vehículos y Matrículas con validaciones y seguridad JWT."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }],

  paths: {
    "/api/auth/login": {
      post: {
        summary: "Iniciar sesión (obtener token)",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" }
                },
                example: { username: "admin", password: "123456" }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Token generado correctamente",
            content: {
              "application/json": {
                example: { ok: true, token: "JWT_TOKEN_AQUI" }
              }
            }
          },
          401: { description: "Credenciales inválidas" }
        }
      }
    },

    "/api/duenos": {
      get: {
        summary: "Listar dueños",
        tags: ["Dueños"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de dueños obtenida correctamente" },
          401: { description: "Token no válido o ausente" }
        }
      },
      post: {
        summary: "Crear dueño",
        tags: ["Dueños"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombres: { type: "string" },
                  apellidos: { type: "string" },
                  cedula: { type: "string" },
                  direccion: { type: "string" },
                  telefono: { type: "string" },
                  email: { type: "string" }
                },
                example: {
                  nombres: "Andrea",
                  apellidos: "Torres Castillo",
                  cedula: "0102345678",
                  direccion: "Av. 12 de Abril y Solano",
                  telefono: "0987654321",
                  email: "andrea@example.com"
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Dueño creado correctamente" },
          401: { description: "Token no válido o ausente" }
        }
      }
    },

    "/api/vehiculos": {
      post: {
        summary: "Crear vehículo",
        tags: ["Vehículos"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  placa: { type: "string" },
                  marca: { type: "string" },
                  modelo: { type: "string" },
                  anio: { type: "integer" },
                  color: { type: "string" },
                  duenoId: { type: "integer" }
                },
                example: {
                  placa: "ABC-9876",
                  marca: "Chevrolet",
                  modelo: "Spark GT",
                  anio: 2022,
                  color: "Rojo",
                  duenoId: 1
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Vehículo creado correctamente" },
          401: { description: "Token no válido o ausente" }
        }
      }
    },

    "/api/matriculas": {
      post: {
        summary: "Crear matrícula",
        tags: ["Matrículas"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  numero: { type: "string" },
                  fechaEmision: { type: "string", format: "date" },
                  fechaExpiracion: { type: "string", format: "date" },
                  estado: { type: "string" },
                  vehiculoId: { type: "integer" }
                },
                example: {
                  numero: "MAT-2025-00001",
                  fechaEmision: "2025-01-10",
                  fechaExpiracion: "2026-01-09",
                  estado: "activa",
                  vehiculoId: 1
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Matrícula creada correctamente" },
          401: { description: "Token no válido o ausente" }
        }
      }
    }
  }
};
