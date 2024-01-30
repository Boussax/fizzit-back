export const sql_create = `CREATE TABLE IF NOT EXISTS Ferments (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Status VARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    FermentationDuration INTEGER NOT NULL
  );`;

export const sql_get_all = `SELECT * FROM Ferments`;
export const sql_get_one = `SELECT * FROM Ferments WHERE ID=$1`;

