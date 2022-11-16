import { Request, response, Response, Router } from "express";

export const indexController = Router();

indexController.get("/", (req: Request, res: Response): Response => {
    return res.status(200).json({ enviroment: req.app.get("env") });
});
