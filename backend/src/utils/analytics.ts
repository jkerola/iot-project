import Sensors from "./sensors";
const limits = {
    co2: {
        low: 450,
        medium: 500,
        high: 600,
    },
};
const calculateAverageCO2 = (co2: Array<number>): number => {
    console.log(co2);
    const sum = co2.reduce((a, b) => a + b);
    return sum / co2.length;
};

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

export { calculateAverageCO2, estimateCrowd };
