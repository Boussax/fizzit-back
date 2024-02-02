export const sql_create_table = `CREATE TABLE IF NOT EXISTS Ferments (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Status VARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    FermentationDuration INTEGER NOT NULL
  );`;

export const sql_get_all = `SELECT * FROM Ferments`;
export const sql_get_one = `SELECT * FROM Ferments WHERE ID=$1`;

export const sql_create_new_ferment = `INSERT INTO Ferments VALUES ($1, $2, $3, $4, $5, $6);`;

export const sql_delete_ferment = `DELETE from Ferments WHERE ID=$1`;
