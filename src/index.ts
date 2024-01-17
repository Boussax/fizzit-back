import express, { Express } from "express";
import dotenv from "dotenv";
import { router as ferments_routes } from "./routes/ferments"
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json()) // parse json body content
app.use('/ferments', ferments_routes)