import cors from "cors";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import log from "./utils/log";

export const hostname = process.env.HOST || "localhost";
export const port = +(process.env.PORT || 4000);

const app = express();

app
  .use(expressPinoLogger({ logger: log }));

export default app;
