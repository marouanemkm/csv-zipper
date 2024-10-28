import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de traitement de CSV",
      version: "1.0.0",
      description: "API pour télécharger un fichier CSV, le traiter et recevoir un fichier ZIP en retour.",
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(swaggerOptions);
