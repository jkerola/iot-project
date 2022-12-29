import { NextFunction, Request, response, Response, Router } from "express";
import Sensors from "../utils/sensors";
import Axios from "axios";
import dotenv from "dotenv";
import { calculateAverage, estimateCrowd } from "../utils/analytics";

export const areasController = Router();

dotenv.config();

// Constants
const APIKEY = process.env.API_KEY;
const BASEURL = "https://query-api.rahtiapp.fi";
const TIMESPAN = 30 * 60 * 1000; // past 30 minutes

// Get information from all restaurants
areasController.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Generate url
            const now = new Date();
            const from = new Date(now.getTime() - TIMESPAN); // 30 minutes previous
            const sensorIds = Sensors.all.join(",");
            const url = `${BASEURL}/events?deviceIds=${sensorIds}&from=${from.toISOString()}&to=${now.toISOString()}`;

            // parse response data into data points
            const response = await Axios.get(url, {
                headers: {
                    Authorization: `Api-key ${APIKEY}`,
                },
            });
            const points = [...response.data]
                .filter(e => e.co2 != null && e.co2 < 65000)
                .map(e => ({
                    time: e.time,
                    co2: e.co2,
                    id: e.deveui.split("-").join("").toUpperCase(),
                }));

            // divide points by restaurant
            const mara = points.filter(e => Sensors.mara.includes(e.id));
            const napa = points.filter(e => Sensors.napa.includes(e.id));
            const foobar = points.filter(e => Sensors.foobar.includes(e.id));
            const kastari = points.filter(e => Sensors.kastari.includes(e.id));
            const foodoo = points.filter(e => Sensors.foodoo.includes(e.id));

            // average co2 levels
            const foobarAvgCo2 = calculateAverage(foobar.map(e => e.co2));
            const napaAvgCo2 = calculateAverage(napa.map(e => e.co2));
            const maraAvgCo2 = calculateAverage(mara.map(e => e.co2));
            const foodooAvgCo2 = calculateAverage(foodoo.map(e => e.co2));
            const kastariAvgCo2 = calculateAverage(kastari.map(e => e.co2));

            return res.status(200).json({
                areas: Sensors.locations,
                crowd_mara: estimateCrowd(maraAvgCo2),
                crowd_napa: estimateCrowd(napaAvgCo2),
                crowd_foobar: estimateCrowd(foobarAvgCo2),
                crowd_kastari: estimateCrowd(kastariAvgCo2),
                crowd_foodoo: estimateCrowd(foodooAvgCo2),
                co2_mara: maraAvgCo2,
                co2_napa: napaAvgCo2,
                co2_foobar: foobarAvgCo2,
                co2_kastari: kastariAvgCo2,
                co2_foodoo: foodooAvgCo2,
            });
        } catch (error) {
            next(error);
        }
    },
);

// Get specific restaurant information
areasController.get(
    "/:location/",
    async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> => {
        try {
            const location = req.params["location"];
            const sensors = Sensors.getSensorsForLocation(location);
            if (location == null || sensors.length == 0) {
                return res.status(404).json({ error: "no such location" });
            }

            // Generate url
            const now = new Date();
            const from = new Date(now.getTime() - TIMESPAN);
            const url = `${BASEURL}/events?from=${from.toISOString()}&to=${now.toISOString()}&deviceIds=${sensors.join(
                ",",
            )}`;

            // parse response
            const response = await Axios.get(url, {
                headers: {
                    Authorization: `Api-key ${APIKEY}`,
                },
            });
            const points = [...response.data];

            // parse response data into co2 data points
            const co2 = points
                .filter(e => e.co2 != null && e.co2 < 65000)
                .map(e => e.co2);
            const co2_avg = calculateAverage(co2);
            const crowd_level = estimateCrowd(co2_avg);

            // generate graphing data
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
