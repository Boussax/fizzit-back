import { Request, Response } from "express";
import { Ferment } from "../models/ferment";
import {
  sql_create_new_ferment,
  sql_delete_ferment,
  sql_get_all,
  sql_get_one,
} from "../database/queries";
import { Pool } from "pg";

// const ferments = FERMENTS;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fizzit_data",
  password: "3L15@L3mm0",
  port: 5432,
});
let fermentsCount: number = 0;
export const getFerments = (req: Request, res: Response) => {
  pool
    .query(sql_get_all, [])
    .then((results) => {
      const ferments: Ferment[] = [];
      results.rows.forEach((row) => {
        const ferment: Ferment = {
          id: row.id as number,
          name: row.name,
          type: row.type,
          startDate: row.startdate,
          status: row.status,
          fermentationDuration: row.fermentationduration as number,
        };
        ferments.push(ferment);
      });
      res.json(ferments);
    })
    .catch((error) => console.log(error));
};

export const getFerment = (req: Request, res: Response) => {
  pool
    .query(sql_get_one, [req.params.id])
    .then((results) => {
      const ferment: Ferment = {
        id: results.rows[0].id as number,
        name: results.rows[0].name,
        type: results.rows[0].type,
        startDate: results.rows[0].startdate,
        status: results.rows[0].status,
        fermentationDuration: results.rows[0].fermentationduration as number,
      };
      res.json(ferment);
    })
    .catch((error) => console.log(error));
};

export const createFerment = (req: Request, res: Response) => {
  console.log(fermentsCount);
  pool
    .query(sql_create_new_ferment, [
      fermentsCount + 1,
      req.body.name,
      req.body.type,
      "ongoing",
      req.body.startDate,
      req.body.fermentationDuration,
    ])
    .then((result) => {
      console.log(result);
      const createdFerment: Ferment = {
        id: fermentsCount + 1,
        name: req.body.name,
        type: req.body.type,
        status: "ongoing",
        startDate: req.body.startDate,
        fermentationDuration: req.body.fermentationDuration,
      };
      fermentsCount++;
      res.status(201).json(createdFerment);
    });
};

// export const updateFerment = (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const index = ferments.findIndex((ferment) => ferment.id === id);
//   const updatedFerment = {
//     id: ferments[index].id,
//     name: req.body.name,
//     type: req.body.type,
//     status: req.body.status,
//     startDate: req.body.startDate,
//     fermentationDuration: req.body.fermentationDuration,
//   };
//   ferments[index] = updatedFerment;
//   res.status(200).json("Ferment updated");
// };

export const deleteFerment = (req: Request, res: Response) => {
  pool
    .query(sql_delete_ferment, [req.params.id])
    .then(() => res.status(200).json("Ferment deleted"))
    .catch((error) => console.log(error));
};
