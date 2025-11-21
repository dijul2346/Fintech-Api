import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bank Account Verification API",
      version: "1.0.0",
      description: "API to verify bank account details using Cashfree.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // <-- Swagger reads comments from route files
});

export function setupSwagger(app: any) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger UI available at: http://localhost:5000/docs");
}
