import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fintech Crypto API",
      version: "1.0.0",
      description: "API documentation for Crypto endpoints",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:5000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
