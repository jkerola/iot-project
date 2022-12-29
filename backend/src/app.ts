import express from "express";
import logger from "morgan";
import * as path from "path";
import dotenv from "dotenv";
// Routes
import { index } from "./routes/index";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { areasController } from "./controllers/areas";

dotenv.config();

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use("/areas", areasController);

app.use(errorNotFoundHandler);
app.use(errorHandler);
