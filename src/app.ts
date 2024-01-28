import express, { Application } from "express";
import { router as ferments_routes } from "./routes/ferments";
import cors from "cors";

const app: Application = express();
const allowedOrigin = process.env.ALLOWED_ORIGIN;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json()); // parse json body content
app.use("/ferments", ferments_routes);

export default app;
