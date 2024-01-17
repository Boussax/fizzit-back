import { Request, Response } from "express";
import { FERMENTS } from "../mock/mock-ferments";
import { Ferment } from "../models/ferment";

const ferments = FERMENTS;

export const getFerments = (req: Request, res: Response) => {
  res.json(ferments);
};

export const getFerment = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ferment = ferments.find((ferment) => ferment.id === id);

  if (!ferment) {
    return res.status(404).send("Ferment not found");
  }
  res.json(ferment);
};

export const createFerment = (req: Request, res: Response) => {
  const newFerment: Ferment = {
    id: ferments.length + 1,
    name: req.body.name,
    type: req.body.type,
    status: "ongoing",
    startDate: Date.now(),
    fermentationDuration: 5,
  };
  ferments.push(newFerment);
  res.status(201).json(newFerment);
};

export const updateFerment = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = ferments.findIndex((ferment) => ferment.id === id);
  const updatedFerment = {
    id: ferments[index].id,
    name: req.body.name,
    type: req.body.type,
    status: req.body.status,
    startDate: req.body.startDate,
    fermentationDuration: req.body.fermentationDuration,
  };
  ferments[index] = updatedFerment;
  res.status(200).json("Ferment updated");
};

export const deleteFerment = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = ferments.findIndex((ferment) => ferment.id === id);
  ferments.splice(index, 1);
  res.status(200).json("Ferment deleted");
};
