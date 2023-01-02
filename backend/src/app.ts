/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import cors from "cors";
import logger from "morgan";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

// Routes
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { areasController } from "./controllers/areas";

const c = require("cors");

// Create Express server
export const app = express();

app.use(c());

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", areasController);

app.use(errorNotFoundHandler);
app.use(errorHandler);
