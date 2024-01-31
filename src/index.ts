import sanitizedConfig from "../config";
import app from "./app";
import { Pool } from "pg";
import { sql_create } from "./database/queries";

const port: number = sanitizedConfig.PORT;

const pool = new Pool({
  user: sanitizedConfig.PG_USERNAME,
  host: sanitizedConfig.PG_HOSTNAME,
  database: sanitizedConfig.PG_DBNAME,
  password: sanitizedConfig.PG_PWD,
  port: sanitizedConfig.PG_PORT,
});
console.log("[database] Connexion réussie à la base de données");

pool.query(sql_create, []).catch((err) => {
  console.error("error :", err);
});

app.listen(port, () => {
  console.log(`[server] Server is running on port ${port}`);
});
