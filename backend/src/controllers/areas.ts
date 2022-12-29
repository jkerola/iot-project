import { NextFunction, Request, response, Response, Router } from "express";
import Sensors from "../utils/sensors";
import Axios from "axios";
import dotenv from "dotenv";
import { calculateAverageCO2, estimateCrowd } from "../utils/analytics";

export const areasController = Router();

dotenv.config();

// Constants
const APIKEY = process.env.API_KEY;
const BASEURL = "https://query-api.rahtiapp.fi";
const TIMESPAN = 30 * 60 * 1000; // past 30 minutes

areasController.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        const now = new Date();

        const from = new Date(now.getTime() - TIMESPAN); // 30 minutes previous
        try {
            const sensorIds = Sensors.all.join(",");
            const url = `${BASEURL}/events?deviceIds=${sensorIds}&from=${from.toISOString()}&to=${now.toISOString()}`;
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

            // parse individual points
            const mara = points.filter(e => Sensors.mara.includes(e.id));
            const napa = points.filter(e => Sensors.napa.includes(e.id));
            const foobar = points.filter(e => Sensors.foobar.includes(e.id));
            const kastari = points.filter(e => Sensors.kastari.includes(e.id));
            const foodoo = points.filter(e => Sensors.foodoo.includes(e.id));

            // average co2 levels
            const foobar_avg_co2 = calculateAverageCO2(foobar.map(e => e.co2));
            const napa_avg_co2 = calculateAverageCO2(napa.map(e => e.co2));
            const mara_avg_co2 = calculateAverageCO2(mara.map(e => e.co2));
            const foodoo_avg_co2 = calculateAverageCO2(foodoo.map(e => e.co2));
            const kastari_avg_co2 = calculateAverageCO2(
                kastari.map(e => e.co2),
            );

            return res.status(200).json({
                areas: Sensors.locations,
                crowd_mara: estimateCrowd(mara_avg_co2),
                crowd_napa: estimateCrowd(
                    calculateAverageCO2(napa.map(e => e.co2)),
                ),
                crowd_foobar: estimateCrowd(
                    calculateAverageCO2(foobar.map(e => e.co2)),
                ),
                crowd_kastari: estimateCrowd(
                    calculateAverageCO2(kastari.map(e => e.co2)),
                ),
                crowd_foodoo: estimateCrowd(
                    calculateAverageCO2(foodoo.map(e => e.co2)),
                ),
                co2_mara: mara_avg_co2,
                co2_napa: napa_avg_co2,
                co2_foobar: foobar_avg_co2,
                co2_kastari: kastari_avg_co2,
                co2_foodoo: foodoo_avg_co2,
            });
        } catch (error) {
            next(error);
        }
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
            const location = req.params["location"];
            const sensors = Sensors.getSensorsForLocation(location);
            if (location == null || sensors.length == 0) {
                return res.status(404).json({ error: "no such location" });
            }

            const now = new Date();

            const from = new Date(now.getTime() - TIMESPAN);
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
