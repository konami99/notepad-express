import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand"
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import routes from "./routes";
import { resourceLimits } from "worker_threads";
import { deserializeUser } from "./middle/deserializeUser";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = 3000;
const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async() => {
  await connect();
  routes(app);
})