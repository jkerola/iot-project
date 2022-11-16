import { Request, response, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: "hello world" });
};
