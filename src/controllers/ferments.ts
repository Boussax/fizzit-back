import { Request, Response } from "express";
import { Ferment } from "../models/ferment";
import {
  sql_create_new_ferment,
  sql_delete_ferment,
  sql_get_all,
  sql_get_one,
} from "../database/queries";
import { Pool } from "pg";
import stabilizedConfig from "../../config";

const pool = new Pool({
  user: stabilizedConfig.PG_USERNAME,
  host: stabilizedConfig.PG_HOSTNAME,
  database: stabilizedConfig.PG_DBNAME,
  password: stabilizedConfig.PG_PWD,
  port: stabilizedConfig.PG_PORT,
});

let maxId: number = 0;
pool.query("SELECT MAX(ID) FROM Ferments").then((result) => {
  maxId = Number(result.rows[0].max);
});

function updateMaxId(currentId: number) {
  if (maxId < currentId) {
    maxId = currentId;
  }
}

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
  pool
    .query(sql_create_new_ferment, [
      maxId + 1,
      req.body.name,
      req.body.type,
      "ongoing",
      req.body.startDate,
      req.body.fermentationDuration,
    ])
    .then(() => {
      const createdFerment: Ferment = {
        id: maxId + 1,
        name: req.body.name,
        type: req.body.type,
        status: "ongoing",
        startDate: req.body.startDate,
        fermentationDuration: req.body.fermentationDuration,
      };
      updateMaxId(maxId + 1);
      res.status(201).json(createdFerment);
    });
};

export const deleteFerment = (req: Request, res: Response) => {
  pool
    .query(sql_delete_ferment, [req.params.id])
    .then(() => res.status(200).json("Ferment deleted"))
    .catch((error) => console.log(error));
};
