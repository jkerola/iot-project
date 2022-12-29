import { NextFunction, Request, response, Response, Router } from "express";
import Sensors from "../utils/sensors";
import Axios from "axios";
import { doesNotThrow } from "assert";
import dotenv from "dotenv";
import { calculateAverageCO2, estimateCrowd } from "../utils/analytics";
import { time } from "console";

export const areasController = Router();

dotenv.config();

const BASEURL = process.env.API_URL;
const APIKEY = process.env.API_KEY;

areasController.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        const body = Sensors.locations;
        return res.status(200).json(body);
    },
);

areasController.get(
    "/:location/",
    async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> => {
        try {
            const timespan = 30;
            const location = req.params["location"];
            const sensors = Sensors.getSensorsForLocation(location);
            if (location == null || sensors.length == 0) {
                return res.status(404).json({ error: "no such location" });
            }

            const now = new Date();
            const from = new Date(now.getTime() - timespan * 60 * 1000); // 30 minutes previous
            const url = `${BASEURL}/events?from=${from.toISOString()}&to=${now.toISOString()}&deviceIds=${sensors.join(
                ",",
            )}`;

            const response = await Axios.get(url, {
                headers: {
                    Authorization: `Api-key ${APIKEY}`,
                },
            });

            const points = [...response.data];

            const co2 = points
                .filter(e => e.co2 != null && e.co2 < 65000)
                .map(e => e.co2);
            const co2_avg = calculateAverageCO2(co2);
            const crowd_level = estimateCrowd(co2_avg);

            const co2_data = points
                .filter(e => e.co2 != null && e.co2 < 65000)
                .map(e => ({ time: e.time, co2: e.co2 }));
            return res.status(200).json({
                from,
                to: now,
                co2_avg,
                crowd_level,
                co2_data,
            });
        } catch (e) {
            next(e);
        }
    },
);
