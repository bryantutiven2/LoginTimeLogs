import express, { json } from "express";
import { dbConnection } from "./database/config";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import loginTimeRoutes from "./routes/loginTime.routes";

// cargar variables de entorno
dotenv.config();

// inicializar app express
const app = express();

// conectar con la base de datos
dbConnection();

// uso de middlewares
app.use(morgan("dev"));
app.use(json());
app.use(cors());

app.use("/api/logs/", loginTimeRoutes);

export default app;
