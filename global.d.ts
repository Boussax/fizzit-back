/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    ALLOWED_ORIGIN: string;
    PG_USERNAME: string;
    PG_HOSTNAME: string;
    PG_DBNAME: string;
    PG_PWD: string;
    PG_PORT: number;
  }
}
