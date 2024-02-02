import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

type ENV = {
  PORT: number | undefined;
  ALLOWED_ORIGIN: string | undefined;
};

type Config = {
  PORT: number;
  ALLOWED_ORIGIN: string;
};

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
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
