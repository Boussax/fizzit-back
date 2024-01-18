import express, { Application } from 'express';
import { router as ferments_routes } from "./routes/ferments"

const app: Application = express();
app.use(express.json()) // parse json body content
app.use('/ferments', ferments_routes)

export default app;