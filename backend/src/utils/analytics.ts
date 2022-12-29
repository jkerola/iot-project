/**
 * Arbitrarily chosen limits.
 * Values taken from https://smartcampus.oulu.fi/manage/ grafana view.
 */
const limits = {
    co2: {
        low: 450,
        medium: 500,
        high: 600,
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
const estimateCrowd = (averageCO2: number): string => {
    if (averageCO2 < limits.co2.low) {
        return "very low";
    } else if (averageCO2 > limits.co2.low && averageCO2 < limits.co2.medium) {
        return "low to moderate";
    } else if (averageCO2 > limits.co2.medium && averageCO2 < limits.co2.high) {
        return "moderate to high";
    } else {
        return "high";
    }
};

export { calculateAverage, estimateCrowd };
