import dotenv from "dotenv";
import app from "./app";
import { Pool } from "pg";
import { sql_create } from "./database/queries";

dotenv.config();

const port = process.env.PORT || 3000;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fizzit_data",
  password: "3L15@L3mm0",
  port: 5432,
});
console.log("[database] Connexion réussie à la base de données");

pool.query(sql_create, []).catch((err) => {
  console.error("error :", err);
});

app.listen(port, () => {
  console.log(`[server] Server is running on port ${port}`);
});
