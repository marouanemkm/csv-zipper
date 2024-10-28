import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swaggerConfig";
import uploadRoutes from "./routes/uploadRoutes";
import cors from "cors";
import { PORT } from "./config/env";

dotenv.config();

const app = express();

app.use(cors());

app.use("/", uploadRoutes);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
