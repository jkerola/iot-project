import { Router } from "express";
import { indexController } from "../controllers/index";

export const index = Router();

index.get("/", indexController);
