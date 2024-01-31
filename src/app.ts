import stabilizedConfig from "../config";
import express, { Application } from "express";
import { router as ferments_routes } from "./routes/ferments";
import cors from "cors";

const app: Application = express();
const allowedOrigin = stabilizedConfig.ALLOWED_ORIGIN;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/ferments", ferments_routes);

export default app;
