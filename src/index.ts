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

app.get('/ferment/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const ferment = ferments.find(ferment => ferment.id === id)
    res.json(ferment)
});


app.delete('/ferments/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = ferments.findIndex(ferment => ferment.id === id)
        if (index === -1) {
        return res.status(404).send('Ferment not found')
    }
    ferments.splice(index,1)
    res.status(200).json('Ferment deleted')
})