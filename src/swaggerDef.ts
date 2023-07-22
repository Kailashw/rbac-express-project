import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerDef: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Role-Based Access Control Express Project",
    version: "1.0.0",
    description:
      "API documentation for your Role-Based Access Control Express Project",
  },
  servers: [
    {
      url: "http://localhost:8000", // Replace with your server URL
      description: "Development server",
    },
  ],
  security: [
    {
      bearerAuth: [], // Add this to enable the "Authorize" button
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDef,
  apis: ["./src/routes/*.ts"], // Replace with the path to your route files
};

const specs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
