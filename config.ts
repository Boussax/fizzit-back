import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

type ENV = {
  PORT: number | undefined;
  ALLOWED_ORIGIN: string | undefined;
  PG_USERNAME: string | undefined;
  PG_HOSTNAME: string | undefined;
  PG_DBNAME: string | undefined;
  PG_PWD: string | undefined;
  PG_PORT: number | undefined;
};

type Config = {
  PORT: number;
  ALLOWED_ORIGIN: string;
  PG_USERNAME: string;
  PG_HOSTNAME: string;
  PG_DBNAME: string;
  PG_PWD: string;
  PG_PORT: number;
};

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
    PG_USERNAME: process.env.PG_USERNAME,
    PG_HOSTNAME: process.env.PG_HOSTNAME,
    PG_DBNAME: process.env.PG_DBNAME,
    PG_PWD: process.env.PG_PWD,
    PG_PORT: process.env.PG_PORT ? Number(process.env.PG_PORT) : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
