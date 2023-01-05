/**
 * Arbitrarily chosen limits.
 * Values taken from https://smartcampus.oulu.fi/manage/ grafana view.
 */
const limits = {
    napa: {
        co2: {
            low: 425,
            moderate: 475,
            high: 525,
            veryHigh: 575,
        },
    },
    kastari: {
        co2: {
            low: 475,
            moderate: 525,
            high: 575,
            veryHigh: 625,
        },
    },
    foodoo: {
        co2: {
            low: 500,
            moderate: 550,
            high: 600,
            veryHigh: 650,
        },
    },
    mara: {
        co2: {
            low: 400,
            moderate: 450,
            high: 500,
            veryHigh: 550,
        },
    },
    foobar: {
        co2: {
            low: 450,
            moderate: 500,
            high: 550,
            veryHigh: 600,
        },
    },
};

/**
 * Calculates the average among datapoints.
 * @param list list of datapoints
 * @returns average of datapoints
 */
const calculateAverage = (list: Array<number>): number => {
    const sum = list.reduce((a, b) => a + b);
    return sum / list.length;
};

/**
 * Estimates crowd-levels by comparing values against limits.
 * @param averageCO2 number representing the average co2 level
 * @returns String representing estimate crowd-level
 */
const estimateCrowd = (averageCO2: number, restaurant: string): string => {
    if (averageCO2 < limits[restaurant as keyof typeof limits].co2.low) {
        return "very low";
    } else if (
        averageCO2 < limits[restaurant as keyof typeof limits].co2.moderate
    ) {
        return "low";
    } else if (
        averageCO2 < limits[restaurant as keyof typeof limits].co2.high
    ) {
        return "moderate";
    } else if (
        averageCO2 < limits[restaurant as keyof typeof limits].co2.veryHigh
    ) {
        return "high";
    } else {
        return "very high";
    }
};

export { calculateAverage, estimateCrowd };
