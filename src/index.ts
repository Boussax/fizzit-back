import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { FERMENTS } from "../mock/mock-ferments";
import { Ferment } from "../models/ferment";

dotenv.config();

const ferments = FERMENTS;

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()) // parse json body content

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send("Server running");
});

app.get('/ferments', (req: Request, res: Response) => {
    res.json(ferments);
});
